import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
const Navbar = () => {
  const { user, logoutUser, profileInfo } = useContext(userContext);
  const [visible, setVisible] = useState(true);
  const [hamberger, setHamberger] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setVisible(false);
    } else {
      // Scrolling up
      setVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  let z = profileInfo();
  return (
    <div
      className={`fixed top-0 left-0 right-0  bg-green-100 text-white px-10 py-2 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full  relative">
        <div className="flex justify-end">
          <div className="md:flex items-center justify-center hidden gap-20 text-gray-800 font-semibold">
            <Link to={"/"}>
              <button>Home</button>
            </Link>
            <Link to={"/createblog"}>
              <button>Create a Blog</button>
            </Link>

            {!user && (
              <Link to={"/login"}>
                <button>Login</button>
              </Link>
            )}
            {!user && (
              <Link to={"/signup"}>
                <button>Sign up</button>
              </Link>
            )}
            {user && (
              <Link to={`/profile/${z?.user?._id}`}>
                <button>
                  <div className="flex  justify-center items-center">
                    <div className="bg-gray-200 h-14 w-14 rounded-full"></div>
                    <div className=" ml-5">{z?.user?.name}</div>
                  </div>
                </button>
              </Link>
            )}
            {user && (
              <Link to={"/Login"}>
                <button onClick={logoutUser}>Log out</button>
              </Link>
            )}
          </div>
        </div>
        {/* //mobile reponsive */}
        <div className="flex lg:hidden justify-between items-center ">
          <div className="text-gray-600 lg:hidden">
            {user && (
              <Link to={`/profile/${z?.user?._id}`}>
                <button>
                  <div className="flex md:hidden  justify-center items-center">
                    <div className="bg-gray-200 h-14 w-14 rounded-full"></div>
                    <div className=" ml-5">{z?.user?.name}</div>
                  </div>
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <div className="flex  md:hidden">
              <MenuIcon
                className="text-gray-600 "
                onClick={() => setHamberger(!hamberger)}
              />
            </div>

            {hamberger && (
              <div className="flex flex-col pt-10  -top-5 w-screen h-screen -right-10  bg-white text-gray-800 font-semibold  absolute">
                <div
                  className="pl-4 ml-[80%]"
                  onClick={() => setHamberger(!hamberger)}
                >
                  <CancelPresentationIcon />
                </div>
                <div className=" pl-20 flex flex-col gap-3">
                  <Link to={"/"} onClick={() => setHamberger(false)}>
                    <button>Home</button>
                  </Link>
                  <Link to={"/createblog"} onClick={() => setHamberger(false)}>
                    <button>Create a Blog</button>
                  </Link>

                  {!user && (
                    <Link to={"/login"} onClick={() => setHamberger(false)}>
                      <button>Login</button>
                    </Link>
                  )}
                  {!user && (
                    <Link to={"/signup"} onClick={() => setHamberger(false)}>
                      <button>Sign up</button>
                    </Link>
                  )}

                  {user && (
                    <Link to={"/Login"} onClick={() => setHamberger(false)}>
                      <button onClick={logoutUser}>Log out</button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
