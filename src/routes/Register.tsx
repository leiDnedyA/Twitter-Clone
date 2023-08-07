import { GoogleLogin } from "@react-oauth/google";

function doLoginSuccess(response: any) {
    console.log(response);
    window.localStorage.setItem("googleCredential", response.credential);
    window.location.href = "/";
}

function doLoginError() {

}
export default function Register() {
    return <div>
        <h2>Sign Up</h2>
        <GoogleLogin onSuccess={doLoginSuccess} onError={doLoginError} />
    </div>
}