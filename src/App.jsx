import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authSuccess, logout, setLoading } from "./store/features/userSlice";
import { useDispatch } from "react-redux";
import useApi from "./hooks/useApi";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch();
  const { request, loading, error } = useApi();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await request("POST", "user/verify", {token});

        if (response.status) {
          dispatch(authSuccess({ ...response?.data, token }));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    verifyUser();
  }, [dispatch]);
  return (
    <>
     <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
