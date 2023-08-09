import { useState, useEffect } from "react";
import Post from "../components/Post";
import PostData from "../interfaces/PostData"
import parsePostData from "../util/parsePostData";
import './Home.css'

export default function Home() {
    const [posts, setPosts] = useState<Array<PostData>>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch("http://localhost:8080/api/posts")
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
            {!isLoaded && <p>Loading...</p>}
            {posts.length == 0 && <p>No posts found. This is awkward...</p>}
            {posts.map((post) => {
                return (
                    <Post key={post.id} postData={post} />
                )
            })}
        </div>
    )
}