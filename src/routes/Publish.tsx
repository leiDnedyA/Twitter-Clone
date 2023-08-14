import { FormEvent } from "react";

async function postJSON(data: Object) {
    try {
        const authCredential = localStorage.getItem("googleCredential");
        if (authCredential === null) {
            console.error("ERROR: No login credential available.");
            return;
        }
        const response = await fetch("/api/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authCredential,
            },
            body: JSON.stringify(data),
        });
        console.log(response)
        const result = await response.json();
        window.location.href = `/post?id=${result.postID}`;
    } catch (error) {
        console.log(error);
    }
}

async function submitPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Publishing...");
    const formData = new FormData(e.currentTarget);
    const bodyData = formData.get("body");
    const response: any = await postJSON({ body: bodyData, userID: 1});
    if (response instanceof Response) {
        const result = await response.json();
        console.log(result);
    }
    if (e.target instanceof HTMLFormElement) {
        e.target.reset();
    }
}

export default function Publish() {
    
    return (
        <div>
            <form onSubmit={submitPost}>
                <input name="body" type="text" placeholder="body..." />
                <br />
                <input type="submit" value="Publish" />
            </form>
        </div>
    );
}