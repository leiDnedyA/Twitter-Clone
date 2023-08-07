import Navbar from "./components/Navbar";
import Router from "./context/Router";
import './index.css';

/**
 * TODO:
 * - Update publish functionality to send user to their post when finished
 * - Make posts route get most recent posts
 * - figure out how to connect user to post
 * - publish app so that other users can sign up
 */
export default function App() {
    return (
        <div className="App">
            <div className="app-container">
                <Navbar />
                <Router />
            </div>
        </div>
    );
}