import { useEffect } from "react"

export default function Logout() {

    useEffect(()=>{
        window.localStorage.removeItem('googleCredential');
        window.location.href = '/';
    }, []);

    return <div>
        <p>Logging out...</p>
    </div>
}