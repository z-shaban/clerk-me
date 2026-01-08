import App from "./App";
import { SignupForm } from "./components/signupform";
import { Profile } from "./pages/profile";

export const routes = [
    {
        path: '/',
        element: <SignupForm/>
    },
    {
        path: '/profile',
        element: <Profile />   
    }
]