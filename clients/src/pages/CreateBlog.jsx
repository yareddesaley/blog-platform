import React, { useContext, useEffect } from "react";
import { userContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const CreateBlog = () => {
  const { user, blogInfo, setBlogInfo, blogError, postBlog, blogLoading } =
    useContext(userContext);

  return (
    <div className="bg-gray-200 flex justify-center">
      <div className="w-full lg:w-[80%] bg-white h-[1200px] mt-10">
        {user ? (
          <div>
            {useEffect(() => setBlogInfo({ ...blogInfo, userDatas: user }), [])}
            <div className="m-10 flex flex-col gap-3 items-center">
              <label htmlFor="title" className="text-xl font-semibold">
                Title
              </label>

              <textarea
                className="w-full lg:w-[80%] outline-none border-2 border-gray-200  text-start resize-none p-2"
                placeholder="Start typing here..."
                onChange={(e) =>
                  setBlogInfo({ ...blogInfo, title: e.target.value })
                }
              ></textarea>
            </div>
            <div className="m-10 flex flex-col gap-3 items-center">
              <label htmlFor="title" className="text-xl font-semibold">
                Your Blog
              </label>
              <textarea
                className="w-full lg:w-[80%] outline-none border-2 border-gray-200 h-screen text-start resize-none p-2"
                placeholder="Start typing here..."
                onChange={(e) =>
                  setBlogInfo({ ...blogInfo, body: e.target.value })
                }
              ></textarea>
            </div>
            <button
              className="bg-green-800 py-2 px-6 font-bold text-white rounded-2xl text-lg flex mx-auto"
              onClick={postBlog}
            >
              {blogLoading ? "Posting..." : "Post"}
            </button>
            {blogError && (
              <div className="bg-white w-[50%] mx-auto mt-5 h-20  text-red-500 p-5  text-lg flex justify-center rounded-xl outline outline-red-500">
                {blogError}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-32 justify-center items-center">
            <h1>Login First to Continue</h1>

            <Link to={"/login"}>
              <button className="bg-green-800 py-2 px-6 font-bold text-white rounded-2xl text-lg">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
