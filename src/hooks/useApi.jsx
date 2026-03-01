import { useState } from 'react'
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {setLoading} from "../store/features/userSlice";

const useApi = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const request = async(method, url, data={}) => {
        setError(null);

        try{
           const response = await api({
                url,
                method,
                data
            })

            if(!response?.data?.status){
                toast.error(response?.data?.message)
            }
            return response.data;
        }catch(err){
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            
            dispatch(setLoading(false));
        }
    }
  
    return { request, error };
}

export default useApi
