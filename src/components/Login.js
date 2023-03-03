import { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const Login = () => {
  let history = useHistory();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const loginHandler = (event) => {
    setLogin(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHanlder = (event) => {
    event.preventDefault();
    let obj = {
      email: login,
      password: password,
      returnSecureToken: true,
    };
    console.log(obj);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1U1e25HANKDFW-PG0qIHP8Rpufj4ruLo",
        obj
      )
      .then((response) => {
        const named = response.data.email;
        localStorage.setItem("name", named);
        history.replace("/home");
      })
      .catch((error) => {
        alert(error.response.data.error.message);
      });
  };

  return (
    <div>
      <form className="master" onSubmit={submitHanlder}>
        <div className="inp">
          <div>
            <input
              type={"email"}
              className="inp1"
              placeholder="Enter Your e-mail ID"
              onChange={loginHandler}
            />
          </div>
          <input
            type={"password"}
            className="inp2"
            placeholder="Enter Your Password"
            onChange={passwordHandler}
          />
        </div>
        <button className="login" type={"submit"}>
          Log In
        </button>
        <Link to="/signup">
          <p className="text">Not Registered? Sign Up</p>
        </Link>
      </form>
    </div>
  );
};
export default Login;
