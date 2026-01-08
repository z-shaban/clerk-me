import App from "./App";
import { LoginForm } from "./components/loginForm";
import { SignupForm } from "./components/signupform";
import { Profile } from "./pages/profile";
import { Signup } from "./pages/signup";

export const routes = [
    {
        path: '/',
        element: <Signup/>,
        children: [
        {index: true, element: <SignupForm/>},
         {path:'login',element:<LoginForm/>},
        ]
    },
    {
        path: '/profile',
        element: <Profile />   
    }
]