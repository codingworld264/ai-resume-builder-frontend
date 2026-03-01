import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState =  {
                        loggedIn: null,
                        token: null,
                        userId: null,
                        email: null,
                        name: null,
                        loading: true
                      }

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    authSuccess:(state, action) => {
      const payload = action.payload
       if (payload?.token) {
          localStorage.setItem("token", payload.token);
          state.loggedIn = true;
          state.token = payload?.token;
          state.userId = payload?._id;
          state.email = payload?.email;
          state.name = payload?.name;
          state.firstName = payload?.firstName;
          state.lastName = payload?.lastName;
      }
    },
    logout:(state) => {
      localStorage.removeItem("token");
      toast.success("You have been logged out successfully!")
      return initialState;
    },
    setLoading:(state, action) => {
      state.loading = action.payload
    }
  }
});

export const {authSuccess, logout, setLoading} = userSlice.actions;
export default userSlice.reducer;