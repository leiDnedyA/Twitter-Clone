import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'
import Home from '../routes/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <div>About</div>
    },
    {
        path: '/profile',
        element: <div>Profile</div>
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router} />
    )
}