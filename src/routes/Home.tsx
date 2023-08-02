import Post from "../components/Post";
import PostData from "../interfaces/PostData"

export default function Home() {
    const posts: Array<PostData> = [
        {
            id: 1,
            body: "This is my first post!",
            date: "2021-01-01",
            user: {
                id: 1,
                username: "user1"
            }
        },
        {
            id: 2,
            body: "This is my second post!",
            date: "2021-01-02",
            user: {
                id: 1,
                username: "user1"
            }
        }
    ];

    return (
        <div>
            {posts.map((post)=> { return <Post key={post.id} {...post} />})}
        </div>
    )
}