import { Cancel, Explore } from "@material-ui/icons";
import { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import env from "./settings";

function Login({ setShowLogin,myStorage,setcurrentUser }) {
  const nameRef = useRef();
  const passwordRef = useRef();
  const [failure, setFailure] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(`${env.api}/users/login`, user);
      myStorage.setItem("user",res.data.username)
      setcurrentUser(res.data.username)
      setShowLogin(false)
      setFailure(false);
    } catch (error) {
      setFailure(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Explore />
        Foodiesplore!
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginButton">Login</button>

        {failure && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="closeLogin" onClick={() => setShowLogin(false)} />
    </div>
  );
}

export default Login;
