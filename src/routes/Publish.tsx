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

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function submitPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Publishing...");
    const formData = new FormData(e.currentTarget);
    const bodyData = formData.get("body");
    const response: any = await postJSON({ body: bodyData, userID: 1 });
    if (response instanceof Response) {
        const result = await response.json();
        console.log(result);
    }
}

export default function Publish() {
    
    return (
        <div>
            <form onSubmit={submitPost}>
                <input name="username" type="text" placeholder="Username" />
                <br />
                <input name="body" type="text" placeholder="body..." />
                <br />
                <input type="submit" value="Publish" />
            </form>
        </div>
    );
}