import { useState } from 'react'
import api from '../api/axios';
import { toast } from 'react-toastify';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async(method, url, data={}) => {
        setLoading(true);
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
            setError(err.response?.data?.message || "Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    }
  
    return { request, loading, error };
}

export default useApi
