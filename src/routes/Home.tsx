import { useState, useEffect } from "react";
import Post from "../components/Post";
import PostData from "../interfaces/PostData"
import parsePostData from "../util/parsePostData";

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
            .then(()=>{
                setIsLoaded(true);
            });
    }, []);

    return (
        <div>
            {!isLoaded && <p>Loading...</p>}
            {posts.map((post) => {
                return (
                    <Post key={post.id} postData={post} />
                )
            })}
        </div>
    )
}