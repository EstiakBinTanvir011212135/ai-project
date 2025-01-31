import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useUser from "../hooks/useUser";
import useHealth from "../hooks/useHealth";
import { useForm } from "react-hook-form";

const Health = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [healths] = useHealth();
  console.log("healths", healths);

  const findUser = users.find((userEmail) => userEmail?.email === user?.email);
  console.log(findUser);
  const userId = findUser?._id;
  const userHealthInfo = healths.find((health) => health?.user === userId);
  console.log("userHealthInfo", userHealthInfo);
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();
  const onSubmit = (data) => {
    const healthData = {
      hight: data.hight,
      weight: data.weight,
    };
    fetch(`https://kawan.onrender.com/api/v1/health/${userHealthInfo?._id}`, {
      method: "PATCH",
      headers: {
        "COntent-Type": "application/json",
      },
      body: JSON.stringify(healthData),
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <p className="text-center text-3xl mt-9 mb-5 ">
        {" "}
        <u>
          This is your health condition
          <span className="uppercase text-4xl">{findUser?.name}</span>
        </u>
      </p>
      <div className="flex m-8">
        <div className="w-[50%]">
          <p className="">Do you want to update Your health info </p>
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
              <label htmlFor="">Enter your Hight</label>
              <br />
              <input
                type="text"
                {...register("weight")}
                required={true}
                name="weight"
                placeholder="Enter Your Weight"
                className="input-bgRemove"
              />
            </div>
            <div className="form-control mt-6 mb-9 w-[80%]">
              <input
                className="signUpBtn"
                type="submit"
                value="update Health"
              />
            </div>
          </form>
        </div>
        <div className="vl"></div>
        <div className="w-[50%]">
          <p className="text-xl">your Present Hight </p>{" "}
          <span className="text-amber-700 font-bold">
            {" "}
            {userHealthInfo?.hight}m
          </span>
          <p className="text-xl">Your current Wight </p>{" "}
          <span className="text-amber-700 font-bold">
            {" "}
            {userHealthInfo?.weight}kg
          </span>
          <p className="text-xl">Your current BMI </p>
          <span className="text-amber-700 font-bold">
            {" "}
            {userHealthInfo?.BMI}kg
          </span>
          <p className="text-xl">suggestion For You </p>{" "}
          <span className="text-amber-700 font-bold">
            {" "}
            {userHealthInfo?.suggestion}m
          </span>
        </div>
      </div>
    </div>
  );
};

export default Health;
