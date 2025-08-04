
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../components/footer";


const HomeLayout = ({ children }) => {


  function changeWidth() {
    //to open the drawer toggler current drawer width is 0
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer(){
    const element = document.getElementsByClassName("drawer-toggle")
    element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
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
              className="font-bold text-black m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu py-16 w-48 sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <div className="py-16">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
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
