import React from 'react'
import {auth,provider} from "../firbase-config"
import {signInWithPopup} from "firebase/auth"
import Cookies from 'universal-cookie';
import "../App.css"
const cookies = new Cookies();

const Auth = (props) => {
    const {setIsAuth} =props

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth,provider);
            cookies.set("auth-token",result.user.refreshToken);
            setIsAuth(true)
        } catch (err) {
            console.error(err)
        }
       

    }


  return (
    
    <div style={{
        height:"100vh",
        width:"100%",
        paddingBottom:"80px",
        
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        
        background: "linear-gradient(0deg, rgba(113,121,121,1) 0%, rgba(1,192,200,1) 100%)"

    }} className='auth'>
        <p className='box'
        >Welcome to Chat APP</p>
        
        <button
        className='sign-btn'
       onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default Auth;