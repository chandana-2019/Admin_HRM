import React, { useRef,useState } from 'react'
import '../../../Styles/loginStyle.css'
import LoginSide from '../../../Images/login_side.png'
import Logingeaderimg from '../../../Images/loginHeader.png'
import { useForm } from "react-hook-form";

const EnterEmail =(props) =>{
    const { register, handleSubmit, watch, errors } = useForm();
    const[input_style,set_input_style] =useState("ideal_empty_input")
  const[label_style,set_label_style] =useState("ideal_label_on_empty_input")
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = (e) => {
        console.log(e);
        
      };    
      const checkEmail=()=>{
          
      }
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
                    <div>
                        <div className="col-lg-10 col-xl-7 mx-auto">
                        <div className="text-center mb-4">
                            <div>
                            <img src={Logingeaderimg} className="loginHeader"/>
                            </div>
                             <span className="welcome_back_login">Enter your email and we send you a password reset link.</span>
                            </div>
                            
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="row">
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                
                                    <input
                                    name="email"  
                                    type="email" placeholder="Email address"
                                    autofocus="" className="border-3" 
                                    onBlur={checkEmail}
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
                                      onFocus={onInputFocus}
                                      onBlur={lossFocus}
                                      className={errors.password ? "inputColorLine" : input_style}
                                      />
                                       {errors.password && (
                                           <div><span className="inputTextError">{errors.password.message}</span></div>
                                           )}
                                           <label htmlFor="password" className={errors.password ?
                                            "inputColorLine input_label_on_error" : label_style}
                                        >Password</label>
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
                                      onFocus={onInputFocus}
                                      onBlur={lossFocus}
                                      className={errors.conf_pass ? "inputColorLine" : input_style}
                                      />
                                       {errors.conf_pass && (
                                           <div><span className="inputTextError">{errors.conf_pass.message}</span></div>
                                           )}
                                           <label htmlFor="conf_pass" className={errors.conf_pass ?
                                            "inputColorLine input_label_on_error" : label_style}
                                        >Conferm password</label>
                                </div>
                                </div>
                                <div className="row">
                              <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" align="left">
                              <i className="fas fa-arrow-left"
                              onClick={props.trigerBack}
                              ></i>
                                </div>
                                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9" align="right">
                                <button type="submit" 
                                onClick={props.trigerOnClickSendEmailReq}
                                className="btn primaryDarkColor
                                col-3 col-sm-3 col-md-5 col-lg-5 col-xl-5
                                ">Send request</button>
                                </div>
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

export default EnterEmail
