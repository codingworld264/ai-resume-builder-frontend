import { useState } from 'react'
import api from '../api/axios';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async(method, url, data=null) => {
        setLoading(true);
        setError(null);

        try{
           const response = await api({
                url,
                method,
                data
            })
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
