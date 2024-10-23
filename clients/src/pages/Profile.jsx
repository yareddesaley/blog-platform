import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const {
    profileInfo,
    user,
    getUser,
    setGetUser,
    allBlogs,
    deleteBlog,
    getUserId,
    setGetUserId,
    allBlogsFun,
  } = useContext(userContext);
  useEffect(() => allBlogsFun, [allBlogs]);
  const { userId } = useParams();
  let z = profileInfo();
  console.log("all blogs pofile", allBlogs);
  const profileDatas =
    allBlogs &&
    allBlogs.filter((item) => {
      const obj = item.userDatas;
      let z;
      if (typeof obj === "string") {
        try {
          z = JSON.parse(obj);
        } catch (error) {
          console.error("JSON parsing error:", error);
          z = {};
        }
      } else {
        z = obj;
      }

      let matched = String(z.user._id) === String(userId);
      return matched;
    });
  return (
    <div className="mt-32">
      <div className="flex  justify-start m-10 items-center ">
        <div className="bg-gray-200 lg:h-64 lg:w-64 h-24 w-24 rounded-full"></div>
        <div className=" ml-10 text-lg font-semibold">{z?.user?.name}</div>
      </div>
      <hr className="border-t-2 border-gray-200 w-full" />
      <div>
        <h1 className="ml-[25%] lg:ml-[45%] text-xl mt-5">
          Posts Created By You
        </h1>
        <div className="flex flex-col-reverse bg-gray-100">
          {profileDatas &&
            profileDatas.map((item) => (
              <div
                className="my-10 flex justify-center items-center"
                key={item._id}
              >
                <div className="w-[90%] lg:w-[50%] p-5 bg-white rounded-xl">
                  <div
                    className="text-red-500 flex justify-end font-semibold cursor-pointer"
                    onClick={() => {
                      setGetUserId({ id: item._id });
                      deleteBlog();
                    }}
                  >
                    Delete
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold ml-5 mb-3">
                      {item.title}
                      {/* <div className="text-sm font-normal"> {date}</div> */}
                    </h1>
                  </div>
                  <hr className="border border-t-2 border-gray-300 w-full mb-3" />
                  <p className="ml-5">{item.body}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
