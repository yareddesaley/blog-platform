import React, { useContext, useEffect } from "react";
import { userContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    registerUser,
    setRegisterUser,
    register,
    user,
    registerError,
    setRegisterError,
    registerLoading,
  } = useContext(userContext);
  return (
    <div className="flex justify-center mt-16">
      <div className="bg-green-200 w-[80%] lg:w-1/4  flex flex-col gap-5 items-center justify-center p-10 rounded-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="user-name" className="font-semibold">
            User Name
          </label>
          <input
            type="text"
            placeholder="User Name"
            className="p-2 outline-none rounded-xl"
            onChange={(e) =>
              setRegisterUser({ ...registerUser, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            className="p-2 outline-none rounded-xl"
            onChange={(e) =>
              setRegisterUser({ ...registerUser, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="pasword"
            placeholder="password"
            className="p-2 outline-none rounded-xl"
            onChange={(e) =>
              setRegisterUser({ ...registerUser, password: e.target.value })
            }
          />
        </div>

        <button
          className="bg-green-800 py-2 px-6 font-bold text-white rounded-2xl text-lg"
          onClick={register}
        >
          {registerLoading ? registerLoading : "Sign Up"}
        </button>
        <div className="flex flex-col items-center gap-1">
          <p>Have an Account? </p>
          <Link
            to={"/login"}
            className="bg-green-800 py-1 px-3 font-bold text-white rounded-2xl text-sm"
          >
            <button>Login here</button>
          </Link>
        </div>

        {registerError && (
          <div className="bg-white h-20 text-red-500 p-5  text-lg flex justify-center rounded-xl outline outline-red-500">
            {registerError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
