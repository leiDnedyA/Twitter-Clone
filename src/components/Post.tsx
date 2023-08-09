import PostData from "../interfaces/PostData";
import { FiThumbsUp } from 'react-icons/fi'
import './Post.css';
export default function Post(props: { postData: PostData }) {
    return (
        <>
            <div className="post">
                <p className="post-username">{props.postData.user.name}</p>
                <p className="post-body">{props.postData.body}</p>
                <p className="post-date">{props.postData.date}</p>
                <div className="post-interactions">
                    <a href="#" className="post-interact"><FiThumbsUp /></a>
                    <a href="#" className="post-interact">Leave a comment</a>
                </div>
            </div>
            <br />
        </>
    )
}