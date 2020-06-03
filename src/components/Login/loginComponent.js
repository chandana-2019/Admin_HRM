import React, { useState } from 'react'
import '../../Styles/loginStyle.css'
import { useHistory, Link } from "react-router-dom";
import LoginSide from '../../Images/login_side.png'
import Logingeaderimg from '../../Images/loginHeader.png'
import { useForm } from "react-hook-form";

const LoginComp =(props) =>{
    const { register, handleSubmit, reset, errors } = useForm();
    const[input_style,set_input_style] =useState("ideal_empty_input")
  const[label_style,set_label_style] =useState("ideal_label_on_empty_input")
    
    const history = useHistory();
    const onSubmit = (e) => {
        console.log(e);
        
      };
      const onInputFocus=()=>{
        set_input_style("on_focus_input_style")
        set_label_style("on_focus_input_label_style")
      }
      const lossFocus=(e)=>{
    
        const v = (e.target.value)
        console.log(v)
        if(v!==""){
           set_input_style("on_loss_focus_input_style")
          set_label_style("on_loss_focus_input_label_style")
        }
      }
      
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
                             <span className="welcome_back_login">Welcome back! Please login to your account.</span>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group mb-3">
                                
                                    <input
                                    name="email"  
                                    type="email" placeholder="Email address"
                                    autofocus="" className="border-3" 
                                    ref={register({ required: true })}
                                    onFocus={onInputFocus}
                                    onBlur={lossFocus}
                                    className={errors.email ? "inputColorLine" : input_style}
                                    
                                    />
                                     {errors.email && (
                                         <div><span className="inputTextError">Email is required</span></div>
                                         )}
                                   <label htmlFor="email" className={errors.email ? "inputColorLine input_label_on_error" : label_style}
                                        >Email</label>
                                 </div>
                                <div className="form-group mb-3">
                                    <input
                                     id="password" name="password"
                                      type="password" placeholder="Password" 
                                      className="border-3" 
                                      ref={register({ required: true })}
                                      onFocus={onInputFocus}
                                      onBlur={lossFocus}
                                      className={errors.password ? "inputColorLine" : input_style}
                                      />
                                       {errors.password && (
                                           <div><span className="inputTextError">password is required</span></div>
                                           )}
                                           <label htmlFor="password" className={errors.password ? "inputColorLine input_label_on_error" : label_style}
                                        >Password</label>
                                </div>
                            <div className="row">

                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" align="left">

                                <button type="submit" 
                                className="btn primaryDarkColor
                                col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5
                                ">Login</button>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" align="right">
                                <p 
                                onClick={props.trigerOnClickPassForget}
                                className="forgetPass"
                                >Forget password</p>
                                </div>
                            </div>
                                
                            </form>
                            <div className="row mt-3">

                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" align="left">
                                        <a>Not registered ?</a>&nbsp;
                                        <Link to="/register">registere</Link>
                                    </div> */}
                                {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" align="left">
                                <p 
                                onClick={props.trigerOnClickPassForget}
                                >Forget password</p>
                                </div> */}
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

export default LoginComp
