import { Cancel, Explore } from "@material-ui/icons"
import { useRef, useState } from "react"
import  "./register.css"
import axios from 'axios'
import env from "../settings";

function Register({setShowRegister}) {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
const [success,setSuccess] = useState(false)
const [failure,setFailure] = useState(false)

const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser ={
        username:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,
    };
    try {
         await axios.post(`${env.api}/users/register`,newUser);
        setFailure(false)
        setSuccess(true)
    } catch (error) {
        setFailure(true);
    }
}

    return (
        <div className="registerContainer">
            <div className="logo">
        <Explore/>
        Foodiesplore!
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password"ref={passwordRef}/>
                <button className="registerButton">Register</button>
                {success &&(
                    <span className="success">Successful.You can log in now!</span>
                )}
                {failure && (
                <span className="failure">Something went wrong!</span>
                )}
                
                
            </form>
            <Cancel className="closeRegister" onClick={()=>setShowRegister(false)}/>
        </div>
    )
}

export default Register
