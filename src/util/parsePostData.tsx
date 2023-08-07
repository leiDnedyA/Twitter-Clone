import PostData from "../interfaces/PostData";

interface RawPostData {
    id: number,
    body: string,
    userID: number,
    createdAt: string,
    updatedAt: string
}

export default async function parsePostData(data: null | RawPostData): Promise<PostData> {
    if (data == null) {
        throw new Error('invalid post data');
    }

    const userResponse = await fetch(`/api/user?id=${data.userID}`);
    const user = await userResponse.json();

    return {
        id: data.id,
        body: data.body,
        date: data.createdAt,
        user: { id: user.id, name: user.name }
    };

}