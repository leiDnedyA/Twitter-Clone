import PostComment from "./PostComment";
import UserData from "./UserData";

export default interface PostData {
    id: number;
    body: string;
    date: string;
    user: UserData;
    isLiked: boolean;
    likeCount: number;
    comments: PostComment[];
}