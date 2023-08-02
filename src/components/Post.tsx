import PostData from "../interfaces/PostData";

export default function Post(postData: PostData) {
    return (
        <div>
            <p>{postData.user.username}</p>
            <p>{postData.body}</p>
            <p>{postData.date}</p>
        </div>
    )
}