import React, { useState } from 'react'
import LoginComp from '../../components/Login/loginComponent'
import EnterEmail from '../../components/Login/resetPass/enterEmail'
import NewPassword from '../../components/Login/resetPass/newPass'

const Login =() =>{
    const [emailClick,setemailClick] = useState(false)
    const [PassState,setPassState] = useState(false)
    const checkEmail =()=>{
        setemailClick(true)
    
    }
    const goBack=()=>{
        setemailClick(false)
    }
  
        return (
            <div className="container-fluid">
                {emailClick === false && <LoginComp trigerOnClickPassForget={checkEmail}/>}
                 {emailClick === true && <EnterEmail trigerBack={goBack}/>}
                
            </div>

        )
    
}

export default Login
