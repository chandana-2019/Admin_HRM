import React,{useRef} from 'react'
import '../../Styles/loginStyle.css'
import { useHistory, Link } from "react-router-dom";
import LoginSide from '../../Images/login_side.png'
import Logingeaderimg from '../../Images/loginHeader.png'
import { useForm } from "react-hook-form";

const Register =() =>{
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();
    const onSubmit = (e) => {
        console.log(e);
        
      };

        return (
            <div className="container-fluid">
    <div className="row no-gutter">
 
        <div className="col-md-6 d-none d-md-flex bg-image">
            <img src={LoginSide} className="loginSideImg"/>
        </div>
 
        <div className="col-md-6" id="box">
            <div className="login d-flex align-items-center py-5 mt-5">
 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 mx-auto">
                        <div className="text-center mb-4">
                            <div>
                            <img src={Logingeaderimg} className="loginHeader"/>
                            </div>
                             <span className="welcome_back_login">Please complete to create your account.</span>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">

                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <input
                                    name="first_name"  
                                    type="text" placeholder="Firt name"
                                    autofocus="" className="border-3" 
                                    ref={register({ required: true })}
                                    />
                                     {errors.first_name && (
                                         <div><span className="text-danger">First name is required</span></div>
                                         )}
                                    <label htmlFor ="first_name">First name</label>
                                 </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <input
                                     id="Last_name" name="Last_name"
                                      type="text" placeholder="Last name" 
                                      className="border-3" 
                                      ref={register({ required: true })}
                                      />
                                       {errors.Last_name && (
                                           <div><span className="text-danger">Last name is required</span></div>
                                           )}
                                           <label htmlFor ="Last_name">Last name</label>
                                </div>

                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <input
                                     id="email" name="email"
                                      type="email" placeholder="Email" 
                                      className="border-3" 
                                      ref={register({ required: true })}
                                      />
                                       {errors.email && (
                                           <div><span className="text-danger">Email is required</span></div>
                                           )}
                                           <label htmlFor ="email">Email</label>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <select className="form-control"
                                    id="userType" name="userType"
                                      type="userType" placeholder="Email"
                                    ref={register({ required: true })}
                                    >
                                        <option>Admin</option>
                                        <option>Client</option>
                                        <option>Employe</option>
                                    </select>
                                    {errors.userType && (
                                           <div><span className="text-danger">Please select is required</span></div>
                                           )}
                                </div>

                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <input
                                     id="password" name="password"
                                      type="password" placeholder="Password" 
                                      className="border-3" 
                                      ref={register({
                                        required: "Password is required",
                                        minLength: {
                                          value: 8,
                                          message: "Password must have at least 8 characters"
                                        }
                                      })}
                                      />
                                       {errors.password && (
                                           <div><span className="text-danger">{errors.password.message}</span></div>
                                           )}
                                           <label htmlFor ="password">Password</label>
                                </div>
                                   
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <input
                                     id="conf_pass" name="conf_pass"
                                      type="password" placeholder="Conferm password" 
                                      className="border-3" 
                                      ref={register({
                                        validate: value =>
                                          value === password.current || "The passwords do not match"
                                      })}
                                      />
                                       {errors.conf_pass && (
                                           <div><span className="text-danger">{errors.conf_pass.message}</span></div>
                                           )}
                                           <label htmlFor ="conf_pass">Conferm Password</label>
                                </div>

                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="center">

                                <button type="submit" 
                                className="btn primaryDarkColor
                                col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5
                                ">Sing up</button>
                                </div>
                                
                            </form>
                            <div className="row mt-3">

                              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" align="left">
                                      <a>Already registered ?</a>&nbsp;
                                    <Link to="/login">Login</Link>
                                </div>
                                
                            </div>
                        </div>
               
                    </div>
                </div>
 
            </div>
        </div>
 
    </div>
</div>

        )
    
}

export default Register
