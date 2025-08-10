import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Aboutus from "./pages/Aboutus";
import Notfound from "./pages/Notfound";

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
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
