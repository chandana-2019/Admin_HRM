import React, { useRef } from 'react'
import '../../../Styles/loginStyle.css'
import LoginSide from '../../../Images/login_side.png'
import Logingeaderimg from '../../../Images/loginHeader.png'
import { useForm } from "react-hook-form";

const NewPass =(props) =>{
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = (e) => {
        console.log(e);
        
      };    
        return (
            <div className="container-fluid">
    <div className="row no-gutter">
 
        <div className="col-md-6 col-lg-6 col-xl-6 d-none d-md-flex bg-image">
            <img src={LoginSide} className="loginSideImg"/>
        </div>
 
        <div className="col-md-6 col-lg-6 col-xl-6" id="box">
            <div className="login d-flex align-items-center py-5 mt-5">
 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 mx-auto">
                        <div className="text-center mb-4">
                            <div>
                            <img src={Logingeaderimg} className="loginHeader"/>
                            </div>
                             <span className="welcome_back_login">Enter your email and we send you a password reset link.</span>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                
                            
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" align="center">

                                <button type="submit" 
                                className="btn primaryDarkColor
                                col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5
                                ">Send request</button>
                                </div>
                                
                            </form>
                           
                        </div>
               
                    </div>
                </div>
 
            </div>
        </div>
 
    </div>
</div>

        )
    
}

export default NewPass
