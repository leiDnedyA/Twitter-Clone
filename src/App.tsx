import Navbar from "./components/Navbar";
import Router from "./context/Router";
/**
 * TODO:
 * - Make posts route get most recent posts
 * - figure out how to connect user to post
 * - publish app so that other users can sign up
 */
export default function App() {
    return (
        <div>
            <Navbar />
            <Router />
        </div>
    );
}