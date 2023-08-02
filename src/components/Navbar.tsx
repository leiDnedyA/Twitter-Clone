import { Link } from "./Link";

export function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile/">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}