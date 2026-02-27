import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import ResumeForm from './components/ResumeForm.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import "./assets/css/font-awesome.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "resume/create", element: <ResumeForm /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
