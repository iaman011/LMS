import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Aboutus from "./pages/Aboutus";
import Notfound from "./pages/Notfound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";
import CourseList from "./pages/Course/CourseList";
import CourseDescription from "./pages/Course/CourseDescription";
import CreateCourse from "./pages/Course/CreateCourse";
import RequireAuth from "./components/Auth/RequireAuth";
import Profile from "./pages/User/profile";
import EditProfie from "./pages/User/EditProfie";

function App() {
  return (
    <div className="bg-indigo-200">
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />

        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />

        {/* parent route component */}
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
          {/* child route component */}
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfie />} />
        </Route>

        {/* parent route component */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          {/* child route component */}
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

        <Route path="/contacts" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
