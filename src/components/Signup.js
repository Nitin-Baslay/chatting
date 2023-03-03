import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const [signup, setsignup] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();
  const signupHandler = (event) => {
    setsignup(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHanlder = (event) => {
    event.preventDefault();
    let obj = {
      email: signup,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1U1e25HANKDFW-PG0qIHP8Rpufj4ruLo",
        obj
      )
      .then((response) => {
        alert(`${response.data.email} registered Successfully`);
        history.replace("/");
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
              onChange={signupHandler}
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
          Sign Up
        </button>
        <Link to="/">
          <p className="text">Already Registered? Sign In</p>
        </Link>
      </form>
    </div>
  );
};
export default Signup;
