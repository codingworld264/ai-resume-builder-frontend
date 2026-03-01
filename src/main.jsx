import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import ResumeForm from './components/ResumeForm.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';
// import "./assets/css/font-awesome.css";
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import "./assets/js/bootstrap.min.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "resume/create", element: <ResumeForm /> }
        ]
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "signup", element: <Signup /> },
          { path: "login", element: <Login /> }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
