import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[90vh] px-6 sm:px-16 gap-10">
      
      {/* Left Section: Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-indigo-600 drop-shadow-md">
          codeXdev 🚀
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Welcome to <span className="font-bold text-indigo-600">codeXdev</span> — your gateway to a
          <span className="font-semibold text-green-600"> vast library of courses</span> taught by
          <span className="font-semibold text-orange-500"> highly skilled and experienced faculty</span>,
          all at an <span className="font-semibold text-blue-500">affordable price</span>. Start your
          learning journey with us today! 🎓✨
        </p>

        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          🎯 Discover top-notch{" "}
          <span className="text-yellow-500 font-bold">Online Courses</span> tailored just for you!
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          <Link to= "/courses">
            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all">
              Explore Courses
            </button>
          </Link>
          <Link to= "/contact">
            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:border-yellow-600 transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="../../public/lers.png"
          alt="home page image"
          className="w-3/4 md:w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Home;
