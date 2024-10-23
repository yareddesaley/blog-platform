import React, { useContext } from "react";
import { userContext } from "../context/AuthContext";

const Home = () => {
  const { allBlogs, allBlogsFun } = useContext(userContext);
  return (
    <div className="bg-gray-100 pt-10 flex flex-col-reverse mt-16">
      {allBlogs &&
        allBlogs.map((item) => {
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
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const timeStamp = item.createdAt;
          const allDate = new Date(timeStamp);
          const date = `${monthNames[allDate.getMonth()]} ${
            allDate.getDay() + 1
          } ${allDate.getFullYear()}`;

          return (
            <div key={item._id}>
              <div className="w-[90%] lg:w-[50%] m-5 bg-white p-5 flex flex-col mx-auto rounded-lg">
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="bg-gray-100 h-20 w-20 rounded-full"></div>

                  <div className="text-green-500 ml-5">{z?.user?.name}</div>
                </div>
                <hr className="border border-t-2 border-gray-200 w-full my-3" />
                <div className="mt-10">
                  <h1 className="text-lg font-semibold ml-5 mb-3">
                    {item.title}
                    <div className="text-sm font-normal"> {date}</div>
                  </h1>
                  <hr className="border border-t-2 border-gray-100 w-full mb-3" />
                  <p className="ml-5">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
