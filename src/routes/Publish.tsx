import { FormEvent } from "react";

async function postJSON(data: Object) {
    try {
        const response = await fetch("/api/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        console.log(response)
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.log(error);
    }
}

async function submitPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Publishing...");
    const formData = new FormData(e.currentTarget);
    const bodyData = formData.get("body");
    const response: any = await postJSON({ body: bodyData, userID: 1, googleCredential: window.localStorage.getItem("googleCredential") });
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