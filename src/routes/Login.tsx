import { GoogleLogin } from '@react-oauth/google';

function doLoginSuccess(response: any) {
    console.log(response);
    window.localStorage.setItem("googleCredential", response.credential);
    window.location.href = "/";
}

function doLoginError() {
    console.log("Error authenticating with Google");
}
export default function Login() {
    return <div>
        <h2>Login</h2>
        <GoogleLogin onSuccess={doLoginSuccess} onError={doLoginError} />
        <p>Don't have an account? <a href="/register">Register here</a>.</p>
    </div>
}