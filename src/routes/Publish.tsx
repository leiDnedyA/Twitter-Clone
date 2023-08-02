import { FormEvent } from "react";

export default function Publish() {
    function submitPost(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Publishing...");
    }
    return (
        <div>
            <form onSubmit={submitPost}>
                <input type="text" placeholder="Username" />
                <br/>
                <input type="text" placeholder="body..." />
                <br/>
                <input type="submit" value="Publish" />
            </form>
        </div>
    );
}