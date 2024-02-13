import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../redux/actions/userAction.js";
import { logout } from "../utils/localstorage.js";
import useLogin from "../utils/hooks/UseLogin";

const Navbar = () => {
  const [login, setLogin] = useState();
  const { loginInfo } = useLogin();
  const checkLogin = () => {
    if (loginInfo?.isLogin === false) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  console.log(user.userInfo.details?.data?.role);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setInitialState());
    logout();
    navigate("/login");
  };

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <header className="text-gray-600 body-font shadow-lg w-screen fixed bg-white z-40">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link to={"/"} className="mr-5 hover:text-gray-900">
            Home
          </Link>
          {user.userInfo.details?.data?.role === "admin" ? (
            <Link to={"/admin"} className="mr-5 hover:text-gray-900">
              Admin
            </Link>
          ) : (
            <Link to={"/loan-history"} className="mr-5 hover:text-gray-900">
              History
            </Link>
          )}
        </nav>
        <div className="hidden xl:flex items-center space-x-5 ">
          {/* User */}
          <div>
            <div className="items-center">
              <button className="peer relative block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-600 dark:hover:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              {!user.userInfo.isLogin === true ? (
                <div className="hidden peer-hover:flex hover:flex absolute right-4 bg-white dark:bg-custom-dark-second min-w-[160px] shadow-xl z-10 rounded-lg ">
                  <div className="flex flex-col text-center w-full">
                    <div className="my-2">
                      <h1 className="text-center">
                        {user.userInfo.details.username}
                      </h1>
                    </div>
                    <Link
                      to="/login"
                      className={"hover:bg-orange-200 dark:hover:bg-orange-200"}
                    >
                      <button className=" py-4 rounded-lg">Sign In</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="hidden peer-hover:flex hover:flex absolute right-4 bg-white dark:bg-white-700 min-w-[160px] shadow-xl z-10 rounded-lg ">
                  <div className="flex flex-col text-center w-full">
                    <Link
                      className="py-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-400"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
