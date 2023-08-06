import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'

import Home from '../routes/Home';
import Publish from '../routes/Publish';
import Login from '../routes/Login';
import Profile from '../routes/Profile';
import About from '../routes/About';
import Register from '../routes/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/publish',
        element: <Publish />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router} />
    )
}