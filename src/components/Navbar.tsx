import { FaKiwiBird } from 'react-icons/fa';
import './Navbar.css';

function Nav({ href, children }: { href: string, children: any }) {
    return <a className={window.location.pathname == href ? "active-nav Nav" : "Nav"} href={href}>{children}</a>
}

export default function Navbar() {

    return (
        <div className="Navbar">
            <a href="/" className="navbar-logo">Twotter <FaKiwiBird /></a>
            <Nav href="/">Home</Nav>
            {/* <a href="/about">About</a> */}
            {window.localStorage.getItem('googleCredential') == null ?
                <>
                    <Nav href="/login">Login</Nav>
                </> : <>
                    {/* <a href="/profile">Profile</a> */}
                    <Nav href="/publish">Publish</Nav>
                    <Nav href="/logout">Logout</Nav>
                </>
            }
        </div>
    )
}