import Navbar from "./components/Navbar";
import Router from "./context/Router";
import './index.css';

/**
 * TODO:
 * - Finish styling login page, publish page, and single-post page
 * - Allow users to load more posts at bottom of home route
 * - Implement likes and comments
 * - Display parsed timestamps rather than raw ones
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