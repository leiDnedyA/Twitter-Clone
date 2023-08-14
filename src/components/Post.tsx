import PostData from "../interfaces/PostData";
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import './Post.css';
import { useCallback, useState } from "react";

async function likePost(data: Object) {
    try {
        const body = {
            ...data,
            googleCredential: window.localStorage.getItem("googleCredential")
        }
        const authCred = localStorage.getItem("googleCredential");
        if (authCred === null) {
            console.error("Auth credential not found!");
            return;
        }
        const response = await fetch("/api/like", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authCred
            },
            body: JSON.stringify(body),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function unlikePost(data: Object) {
    try {
        const body = {
            ...data
        }
        const authCred = localStorage.getItem("googleCredential");
        if (authCred === null) {
            console.error("Auth credential not found!");
            return;
        }
        const response = await fetch("/api/like", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authCred
            },
            body: JSON.stringify(body),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default function Post(props: { postData: PostData }) {
    const [isLiked, setIsLiked] = useState(props.postData.isLiked);
    const [isLoading, setIsLoading] = useState(false);
    const doLike = useCallback(async () => {
        if (localStorage.getItem('googleCredential') === null) {
            alert("Please log in to like and comment on posts.");
            window.location.href = "/login";
        }
        if (!isLoading) {
            setIsLoading(true);
            let result;
            if (!isLiked) {
                result = await likePost({PostId: props.postData.id});
            } else {
                result = await unlikePost({PostId: props.postData.id});
            }
            console.log(result);
            setIsLoading(false);
            if (result) {
                if (result.ok === true) {
                    setIsLiked(!isLiked);
                }
            }
            
        }
    }, [props.postData, isLiked, setIsLiked, isLoading, setIsLoading]);
    return (
        <>
            <div className="post">
                <p className="post-username">{props.postData.user.name}</p>
                <p className="post-body">{props.postData.body}</p>
                <p className="post-date">{props.postData.date}</p>
                <div className="post-interactions">
                    <a href="#" className="post-interact" onClick={doLike}>
                        {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                    </a>
                    <a href="#" className="post-interact">Leave a comment</a>
                </div>
            </div>
            <br />
        </>
    )
}