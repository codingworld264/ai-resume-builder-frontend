import useApi from '../hooks/useApi';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authSuccess, setLoading } from '../store/features/userSlice';

const Login = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { request } = useApi();

    const onSubmit = async(data) => {
        const {email, password} = data || {};
        const response = await request("POST","user/login",{email, password});
        if(response?.status){
            toast.success(response?.message)
            dispatch(authSuccess({...response?.data}));
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 col-md-4">
                <h3 className="text-center mb-4">Login</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" name="email" placeholder="Email" {...register("email", { 
                                required: true, 
                                pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                setValueAs: (v) => v.trim(), 
                            })}/>

                            {errors?.email?.type === "required" && (
                                <div className="error-text">Email is required.</div>
                            )}

                            {errors?.email?.type === "pattern" && (
                                <div className="error-text">Please enter valid email.</div>
                            )}
                        </div>
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col">
                            <div className="input-group">
                                <input type="password" name="password" className="form-control" placeholder="Password" {...register("password", { required: true, pattern: {
                                    value:
                                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}/,                       
                                } })}/>
                            </div>
                            
                            {errors?.password?.type === "required" && (
                                <div className="error-text">Password is required.</div>
                            )}

                            {errors?.password?.type === "pattern" && (
                                <div className="error-text">Password must be of 8 or more characters long with a mix of uppercase,lowercase,numbers and special characters.</div>
                            )}
                        </div>
                    </div>
                                
                    <button type="submit" className="btn btn-primary w-100">Login</button>    
                </form>
                <p className="text-center mt-3">
                    Don't have account? <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
