import PostData from "../interfaces/PostData";

interface RawPostData {
    id: number,
    body: string,
    UserId: number,
    createdAt: string,
    updatedAt: string,
    isLiked: boolean,
}

export default async function parsePostData(data: null | RawPostData): Promise<PostData> {
    if (data == null) {
        throw new Error('invalid post data');
    }
    const userResponse = await fetch(`/api/user?id=${data.UserId}`);
    const user = await userResponse.json();

    const parsedData: PostData = {
        id: data.id,
        body: data.body,
        date: data.createdAt,
        user: { id: user.id, name: user.name },
        isLiked: false
    }

    if (data.hasOwnProperty("isLiked")) {
        parsedData["isLiked"] = data.isLiked;
    }

    return parsedData;

}