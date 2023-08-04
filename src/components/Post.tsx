import PostData from "../interfaces/PostData";
import './Post.css';
export default function Post(props: {postData: PostData}) {
    return (
        <>
            <div className="post">
                <p className="post-username">{props.postData.user.username}</p>
                <p className="post-body">{props.postData.body}</p>
                <p className="post-date">{props.postData.date}</p>
                <button className="post-like">Like</button>
                <a href="#" className="post-comment">Leave a comment</a>
            </div>
            <br/>
        </>
    )
}