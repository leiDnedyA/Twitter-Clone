export default interface PostComment{
    UserId: number | string;
    PostId: number | string;
    userName: string;
    body: string;
}