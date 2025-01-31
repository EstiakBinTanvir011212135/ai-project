import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import loging from "../../src/assets/login.jpg";
const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;

      const userData = {
        email: data.email,
        name: data.name,
        password: data.password,
      };
      console.log(userData);
      fetch("https://kawan.onrender.com/api/v1/user/create-user", {
        method: "POST",
        headers: {
          "COntent-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          reset();
          alert("User Created Successfully");
          navigate("/home");
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <div className="flex items-center m-16">
      <div className="w-[50%]">
        <img src={loging} alt="" />
      </div>
      <div className="flex-1">
        <p className="textColor ml-[65%]">
          <u>Sign Up</u>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[5%] divOfSignUp">
            <label className="text-xl">
              Enter your Name <span className="text-red-400 text-3xl">*</span>
            </label>
            <br />
            <input
              type="text"
              {...register("name")}
              required={true}
              name="name"
              placeholder="Enter Your  Name "
              className="input-bgRemove"
            />
          </div>
          <div className="mt-[5%] divOfSignUp">
            <label className="text-xl">
              Email
              <span className="text-red-400 text-3xl">*</span>
            </label>
            <br />
            <input
              {...register("email", {
                required: true,
                pattern: {
                  /* TODO : cnage the bscse */
                  // value: /\S+@bscse\.uiu\.ac\.bd$/,
                  message: "Entered value does not match email format",
                },
              })}
              name="email"
              placeholder="Email"
              className="input-bgRemove"
              type="email"
            />
            {/* {errors.email && (
              <span className="text-red-600">This field is required</span>
            )} */}
          </div>{" "}
          <div className="divOfSignUp mt-[5%] mb-[5%]">
            <label className="text-xl">
              Password
              <span className="text-red-400 text-3xl">*</span>
            </label>
            <br />
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              name="password"
              placeholder="Enter Your password"
              className="input-bgRemove"
            />
          </div>{" "}
          {/* this is submit btn */}
          <div className="form-control mt-6 mb-9 w-[80%]">
            <input className="signUpBtn" type="submit" value="Create Account" />
          </div>
          <p>
            Already have an account{" "}
            <NavLink to="/" className={"text-blue-500"}>
              {" "}
              Login
            </NavLink>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
