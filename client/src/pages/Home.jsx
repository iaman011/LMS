import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[100vh] px-6 sm:px-16 gap-10">
      {/* Left Section: Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6 mt-10 mb-5">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-indigo-600 drop-shadow-md mb-10">
          codeXdev
        </h1>

      <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
  Welcome to <span className="font-bold text-indigo-600">codeXdev</span> — your ultimate gateway to a world of knowledge! 🚀<br />
  Explore our extensive library of expertly curated courses, taught by seasoned professionals and industry leaders — all at incredibly affordable prices.<br />
  <span className="font-semibold text-indigo-500">Start your learning journey with us today and unlock your true potential! 🎓✨</span>
</p>


        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          🎯 Discover top-notch{" "}
          <span className="text-yellow-500 font-bold">Online Courses</span>{" "}
          tailored just for you!
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          <Link to="/courses">
            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all">
              Explore Courses
            </button>
          </Link>
          <Link to="/contact">
            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:border-yellow-600 transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="../../public/indomay32.jpg"
          alt="home page image"
          className="w-3/4 md:w-full max-w-md rounded-xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Home;
