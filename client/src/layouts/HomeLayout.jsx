import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
// import {dispatch, useSelector} from 'react-redux'

const HomeLayout = ({ children }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // from auth slice
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    //to open the drawer toggler current drawer width is 0
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  function onLogout(e) {
    e.preventDefault();

    navigate("/"); //once you logout navigate to home page
  }

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <label htmlFor="my-drawer">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-orange-600 cursor-pointer m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu py-16 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <div className="py-16">
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* conditional rendering */}
              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )}
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link to="/courses">All Courses</Link>
              </li>
                {/* Ternary Operator */}
              {!isLoggedIn ? (
                <li className="absolute bottom-4 w-[90%]">
                  <div className="w-full flex items-center justify-center gap-2">
                    <Link
                      to="/login"
                      className="btn btn-primary px-3 py-1 font-semibold rounded-md w-fit text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="btn btn-secondary px-3 py-1 font-semibold rounded-md w-fit text-center"
                    >
                      Signup
                    </Link>
                  </div>
                </li>
              ) : (
                <li className="absolute bottom-4 w-[90%]">
                  <div className="w-full flex items-center justify-center gap-2">
                    <Link
                      to="/user/profile"
                      className="btn btn-primary px-4 py-1 font-semibold rounded-md w-fit text-center"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={onLogout}
                      className="btn btn-secondary px-4 py-1 font-semibold rounded-md w-fit"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
      {children}

      <Footer />
    </div>
  );
};

export default HomeLayout;
