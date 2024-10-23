import React, { createContext, useEffect, useState } from "react";
import { baseuri, getPosts, postRegister } from "../util/service";
export const userContext = createContext();
const AuthContext = ({ children }) => {
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [blogError, setBlogError] = useState(null);
  const [user, setUser] = useState(null);
  const [getuser, setGetUser] = useState(null);
  const [blogUser, setBlogUser] = useState(null);
  const [blog, setBlog] = useState(null);
  const [getUserId, setGetUserId] = useState({ id: "" });
  const [allBlogs, setAllBlogs] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    body: "",
    userDatas: "",
  });
  useEffect(() => setRegisterError(null), []);
  const register = async () => {
    setRegisterLoading("Loading");
    const response = await postRegister(
      `${baseuri}/register`,
      JSON.stringify(registerUser)
    );
    if (response.error) {
      setRegisterError(response.message);
      setRegisterLoading(false);
      return;
    }
    localStorage.setItem("user", JSON.stringify(response));
    setRegisterLoading(false);
    setRegisterError(null);
    setUser(response);
    setBlogUser(response);
    return;
  };
  useEffect(() => {
    let user = localStorage.getItem("user");
    setUser(user);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setBlog(null);
  };

  const loginUser = async () => {
    setLoginLoading("Loading");
    const response = await postRegister(
      `${baseuri}/login`,
      JSON.stringify(loginInfo)
    );
    if (response.error) {
      setLoginError(response.message);
      setLoginLoading(false);
      return;
    }
    localStorage.setItem("user", JSON.stringify(response));
    setLoginLoading(false);
    setLoginError(null);

    setUser(response);
    return;
  };

  // useEffect(() => deleteBlog(), [allBlogs]);
  //blog
  const postBlog = async () => {
    setBlogLoading("Posting");
    const response = await postRegister(
      `${baseuri}/createblog`,
      JSON.stringify(blogInfo)
    );
    if (response.error) {
      setBlogLoading(false);
      setBlogError(response.message);
      return;
    }

    setBlogError(null);
    setBlogLoading(false);
    setBlogUser(response);
    alert("Posted successfully");
    return;
  };
  //getallblogs
  const allBlogsFun = async () => {
    const response = await getPosts(`${baseuri}/allblogs`);
    return setAllBlogs(response);
  };
  useEffect(() => allBlogsFun, [allBlogs]);
  //profile info
  const profileInfo = () => {
    let z;
    if (typeof user === "string") {
      try {
        z = JSON.parse(user);
      } catch (error) {
        console.error("JSON parsing error:", error);
        z = {};
      }
    } else {
      z = user;
    }
    return z;
  };
  //delete a post

  const deleteBlog = async () => {
    const response = await postRegister(
      `${baseuri}/delete`,
      JSON.stringify(getUserId)
    );
    if (response.error) {
      return;
    }
    alert("Deleted Succesfully");
    await allBlogsFun();
  };
  return (
    <div>
      <userContext.Provider
        value={{
          registerUser,
          setRegisterUser,
          user,
          loginError,
          registerError,
          register,
          registerLoading,
          loginLoading,
          setLoginLoading,
          logoutUser,
          loginInfo,
          setLoginInfo,
          loginUser,
          blogInfo,
          setBlogInfo,
          blogLoading,
          setBlogLoading,
          blogError,
          setBlogError,
          postBlog,
          blog,
          allBlogs,
          blogUser,
          profileInfo,
          getuser,
          setGetUser,
          deleteBlog,
          getUserId,
          setGetUserId,
          setRegisterError,
        }}
      >
        {children}
      </userContext.Provider>
    </div>
  );
};

export default AuthContext;
