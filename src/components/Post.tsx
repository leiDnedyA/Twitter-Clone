import PostData from "../interfaces/PostData";

export default function Post(props: {postData: PostData}) {
    return (
        <>
            <div>
                <p>{props.postData.user.username}</p>
                <p>{props.postData.body}</p>
                <p>{props.postData.date}</p>
            </div>
            <br/>
        </>
    )
}