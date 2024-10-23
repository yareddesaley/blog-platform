import React, { useContext } from "react";
import { userContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginInfo, setLoginInfo, loginUser, loginLoading, loginError } =
    useContext(userContext);
  return (
    <div className="flex justify-center mt-16">
      <div className="bg-green-200 w-[80%] lg:w-1/4 flex flex-col gap-5 items-center justify-center p-10 rounded-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            className="p-2 outline-none rounded-xl"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
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
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
        </div>
        <button
          className="bg-green-800 py-2 px-6 font-bold text-white rounded-2xl text-lg"
          onClick={loginUser}
        >
          {loginLoading ? "Logging in" : "Login"}
        </button>
        <div className="flex flex-col items-center gap-1">
          <p>Don't an Account? </p>
          <Link
            to={"/signup"}
            className="bg-green-800 py-1 px-3 font-bold text-white rounded-2xl text-sm"
          >
            <button>Sign up here</button>
          </Link>
        </div>
        {loginError && (
          <div className="bg-white h-20 text-red-500 p-5  text-lg flex justify-center rounded-xl outline outline-red-500">
            {loginError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
