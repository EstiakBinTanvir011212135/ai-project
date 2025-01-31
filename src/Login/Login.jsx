import login from "../../src/assets/login.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Successfully Login");
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.errorMessage;
        setFirebaseErrorMessage(errorMessage);
      });
  };
  return (
    <div className="m-16">
      {/* make the logig page  */}
      {/* take the user email and pass  */}
      <div className="flex">
        <div className="w-[50%]">
          <h1 className=" mb-[10%] mt-[7%] text-5xl font-bold text-amber-500">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mt-[5%] divOfSignUp">
              <label htmlFor="">Email Address</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input-bgRemove"
              />
            </div>
            <div className="divOfSignUp mt-[2%] mb-[5%]">
              <label htmlFor=""> Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter Your password"
                className="input-bgRemove"
              />
            </div>{" "}
            <p className="text-red-500">{firebaseErrorMessage}</p>
            <button className="signUpBtn ">Login</button>
            <p className="mt-4">
              Don't have an Account.
              <NavLink to="/signUp" className={"text-blue-500"}>
                Create an account
              </NavLink>
            </p>
          </form>
        </div>
        <div className="w-[50%]">
          <img className="w-fit" src={login} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
