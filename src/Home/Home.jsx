import { useContext } from "react";
import useUser from "../hooks/useUser";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const findUser = users.find((userEmail) => userEmail?.email === user?.email);
  console.log(findUser);
  const userId = findUser?._id;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();
  const onSubmit = (data) => {
    const healthData = {
      user: userId,
      hight: data.hight,
      weight: data.weight,
    };
    fetch("https://kawan.onrender.com/api/v1/health/create-health", {
      method: "POST",
      headers: {
        "COntent-Type": "application/json",
      },
      body: JSON.stringify(healthData),
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        alert("User Created Successfully");
        navigate("/health");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="m-10">
      <h1 className="">Update User Info </h1>
      <p className="uppercase">{findUser?.name}</p>
      <div>
        <div>
          {/* //? here user input value  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-[5%] divOfSignUp">
              <label htmlFor="">Enter your Hight</label>
              <br />
              <input
                type="text"
                {...register("hight")}
                required={true}
                name="hight"
                placeholder="Enter Your Hight"
                className="input-bgRemove"
              />
            </div>
            <div className="mt-[5%] divOfSignUp">
              <label htmlFor="">Enter your Weight</label>
              <br />
              <input
                type="text"
                {...register("weight")}
                required={true}
                name="weight"
                placeholder="Enter Your weight"
                className="input-bgRemove"
              />
            </div>{" "}
            <div className="form-control mt-6 mb-9 w-[80%]">
              <input
                className="signUpBtn"
                type="submit"
                value="Create Health"
              />
            </div>
          </form>
        </div>
        <div>{/* //! here show the suggestion  */}</div>
      </div>
    </div>
  );
};

export default Home;
