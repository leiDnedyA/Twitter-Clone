import Navbar from "./components/Navbar";
import Router from "./context/Router";
import './index.css';

/**
 * TODO:
 * - Implement likes and comments
 * - Finish styling login page, publish page, and single-post page
 * - Display parsed timestamps rather than raw ones
 * - figure out how to connect user to post
 * - Add some kind of logo to navbar
 * - publish app on google dev console so that other users can sign up
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