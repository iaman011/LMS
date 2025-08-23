import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Aboutus from "./pages/Aboutus";
import Notfound from "./pages/Notfound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

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
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
