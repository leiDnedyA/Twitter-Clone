import { useState, useEffect, MouseEvent } from "react";
import Post from "../components/Post";
import PostData from "../interfaces/PostData"
import parsePostData from "../util/parsePostData";
import './Home.css'

const postsEndpoint = "/api/posts"
const authedPostsEndpoint = "/api/authed-posts"

async function authedFetch(params?: string) {
    const cred = localStorage.getItem("googleCredential");
    const loggedIn = !(cred === null);
    const headers: any = {}
    if (loggedIn) {
        headers["authorization"] = localStorage.getItem("googleCredential");
    }
    const response = await fetch(`${loggedIn ? authedPostsEndpoint : postsEndpoint}${params ? params : ""}`, {
        headers: headers
    })
    if (!response.ok) {
        localStorage.clear();
        location.reload();
    }
    return response;
}

export default function Home() {
    const [posts, setPosts] = useState<Array<PostData>>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    function loadMorePosts (e : MouseEvent) {
        e.preventDefault();
        let params = "";
        if (posts.length > 0) {
            params += `?idLessThan=${posts[posts.length - 1].id}`
        }
        authedFetch(params)
            .then((response) => response.json())
            .then(async (data) => {
                const newPosts = await Promise.all(data.map(async (p: any) => {
                    const postData = await parsePostData(p);
                    return postData;
                }));
                setPosts(posts.concat(newPosts));
            })
            .then(() => {
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        authedFetch()
            .then((response) => response.json())
            .then(async (data) => {
                setPosts(await Promise.all(data.map(async (p: any) => {
                    const postData = await parsePostData(p);
                    return postData;
                })));
            })
            .then(() => {
                setIsLoaded(true);
            });
    }, []);

    return (
        <div className="Home">
            {!isLoaded && <p className="dark-text">Loading...</p>}
            {posts.length == 0 && <p  className="dark-text">No posts found. This is awkward...</p>}
            {posts.map((post) => {
                return (
                    <Post key={post.id} postData={post} />
                )
            })}
            {isLoaded && <a onClick={loadMorePosts} href="#">Load more</a>}
        </div>
    )
}