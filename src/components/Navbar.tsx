
export default function Navbar() {
    return (
        <div className="navbar">
            <a href="/">Home</a>
            <a href="/about">About</a>
            {window.localStorage.getItem('googleCredential') == null ?
                <>
                    <a href="/login">Login</a>
                </> : <>
                    <a href="/profile">Profile</a>
                    <a href="/publish">Publish</a>
                    <a href="/logout">Logout</a>
                </>
            }

        </div>
    )
}