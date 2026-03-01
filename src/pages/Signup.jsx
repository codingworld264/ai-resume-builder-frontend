import { useForm } from 'react-hook-form';
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../store/features/userSlice';

const Signup = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
      setError
    } = useForm();

    const dispatch = useDispatch();
    const { request } = useApi();

    const onSubmit = async(data) => {
        const {firstName, lastName, email, password, confirmPassword} = data || {};

        if (password != confirmPassword) {
            setError("confirmPassword", { type: "manual" });
            return;
        }

        const response = await request("POST","user/register",{firstName, lastName, email, password});
        if(response?.status){
            toast.success(response?.message)
            dispatch(authSuccess({...response?.data}));
        }   
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 col-md-4">
            <h3 className="text-center mb-4">Create Account</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                 <div className="row mb-3">
                    <div className="col">
                       <input className="form-control" name="firstName" placeholder="First Name"  {...register("firstName", { required: true })}/>

                      {errors?.firstName?.type === "required" && (
                         <div className="error-text">First name is required.</div>
                      )}
                     
                    </div>
                    <div className="col">
                      <input className="form-control" name="lastName" placeholder="Last Name"  {...register("lastName", { required: true })}/>
                      {errors?.lastName?.type === "required" && (
                         <div className="error-text">Last name is required.</div>
                      )}
                    </div>
                  </div>

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
                    <div className="row mb-3">
                        <div className="col">
                            <div className="input-group">
                                <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" {...register("confirmPassword", { required: true, pattern: {
                                    value:
                                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}/,                       
                                } })}/>
                            </div>
                            
                            {errors?.confirmPassword?.type === "required" && (
                                <div className="error-text">Confirm Password is required.</div>
                            )}

                            {errors?.confirmPassword?.type === "pattern" && (
                                <div className="error-text">Confirm Password must be of 8 or more characters long with a mix of uppercase,lowercase,numbers and special characters.</div>
                            )}


                            {errors?.confirmPassword?.type === "manual" && (
                                <div className="error-text">Password and confirm password does not match.</div>
                            )}
                        </div>
                    </div>                
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>    
            </form>
            <p className="text-center mt-3">
            Already have account? <Link to="/login">Login</Link>
            </p>
        </div>
        </div>
    )
}

export default Signup
