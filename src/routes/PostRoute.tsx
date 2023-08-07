import { useEffect, useState } from "react";
import Post from "../components/Post";
import PostData from "../interfaces/PostData";
import parsePostData from "../util/parsePostData";

export default function PostRoute() {

    const [post, setPost] = useState<PostData | null>(null);
    const [postExists, setPostExists] = useState(true);

    useEffect(() => {
        const searchParms = new URLSearchParams(window.location.search);
        if (searchParms.has('id')) {
            fetch(`/api/post/?id=${searchParms.get('id')}`)
                .then(res => res.json())
                .then(async data => {
                    setPost(await parsePostData(data));
                })
                .catch(err => {
                    console.error('Error: post not found with given id.', err);
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