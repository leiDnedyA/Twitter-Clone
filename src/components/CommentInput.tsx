import { useState } from 'react';
import './CommentInput.css';
import PostData from '../interfaces/PostData';
import PostComment from '../interfaces/PostComment';

async function postComment(text: string, postId: number | string) {
    const auth = localStorage.getItem("googleCredential");
    if (auth === null || auth === undefined) {
        alert("Login with a Google account to leave comments!");
        return;
    }
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', auth);
    const result = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            body: text,
            PostId: postId
        }),
        headers: requestHeaders
    });
    if (!result.ok) {
        alert("Failed to comment")
    } else {
        const data = await result.json();
        return data.comment;
    }
}

export default function CommentInput({ postData, currComments, setCurrComments }: { postData: PostData, currComments: PostComment[], setCurrComments: (newComments: PostComment[])=>void }) {
    const [isActive, setIsActive] = useState<boolean>(false);


    return <div className="CommentInput">
        {isActive === false ?
            <a href="#" onClick={(e) => {
                e.preventDefault();
                setIsActive(true);
            }} >Leave a comment</a>
            :
            <form onSubmit={async (e) => {
                e.preventDefault();
                if (e.target instanceof HTMLElement) {
                    const inputElement = e.target.firstChild;
                    if (inputElement instanceof HTMLInputElement) {
                        const newComment = await postComment(inputElement.value, postData.id);
                        setCurrComments([newComment].concat(currComments));
                        inputElement.value = "";
                        setIsActive(false);
                    }
                }
            }}>
                <input className='comment-input'
                    name="comment"
                    placeholder='Start typing...'></input>
            </form>}
    </div>
}