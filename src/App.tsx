import Navbar from "./components/Navbar";
import Router from "./context/Router";
import './index.css';

/**
 * TODO:
 * - Solve problem of showing if user has like post on frontend
 * - Implement post comments
 * - Finish styling login page, publish page, and single-post page
 * - Display parsed timestamps rather than raw ones
 * - figure out how to connect user to post
 * - publish app on google dev console so that other users can sign up
 * - Make the readme look nice
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