import { useEffect, useState } from "react";
import Post from "../components/Post";
import PostData from "../interfaces/PostData";

export default function PostRoute() {

    const [post, setPost] = useState<PostData | null>(null);
    const [postExists, setPostExists] = useState(true);

    useEffect(() => {
        const searchParms = new URLSearchParams(window.location.search);
        if (searchParms.has('id')) {
            fetch(`/api/post/?id=${searchParms.get('id')}`)
                .then(res => res.json())
                .then(async data => {
                    console.log(data);
                    const userResponse = await fetch(`/api/user?id=${data.userID}`);
                    const user = await userResponse.json();
                    setPost({
                        id: data.id,
                        body: data.body,
                        date: data.createdAt,
                        user: {id: user.id, name: user.name}
                    });
                })
                .catch(err => {
                    console.error('Error: post not found with given id.');
                    setPostExists(false);
                })

        } else {
            window.location.href = '/';
        }
    }, []);

    return <>
        {post != null && <Post postData={
            post
        } />}
        {!postExists && <p>Sorry, post not found :&#40;</p>}
        </>
}