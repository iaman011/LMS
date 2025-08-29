import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col bg-black text-gray-200">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between min-h-[100vh] px-6 sm:px-16 gap-10">
        {/* Left Section: Hero Text */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6 mt-10 mb-5">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="text-orange-500">codeXdev</span> 🚀 Upskill with World-Class Courses, Designed for Real-World Impact
          </h1>
          <p className="text-lg text-gray-400">
            Master the most in-demand skills — from MERN Stack to DevOps, AI/ML,
            Data Analytics, and Data Science. Learn from industry experts, work on
            real projects, and accelerate your career growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <Link
              to="/courses"
              className="bg-orange-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-orange-700 transition"
            >
              Explore Courses
            </Link>
            <Link
              to="/contacts"
              className="border border-orange-600 text-orange-600 px-6 py-3 rounded-2xl hover:bg-orange-900 hover:text-white transition"
            >
              Talk to Us
            </Link>
          </div>
        </div>

        {/* Right Section: Hero Illustration Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-gray-900 rounded-2xl shadow-lg p-10 w-[90%] h-[300px] flex items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-200">
              codeXdev Learning Platform
            </h2>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <section className="px-6 sm:px-16 py-16 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          📚 Future-Ready Courses, Tailored for You
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "MERN Stack Mastery",
              desc: "Build full-stack, scalable applications with MongoDB, Express, React, and Node.js. Learn deployment, authentication, and best practices to become a complete MERN developer.",
            },
            {
              title: "DevOps Essentials",
              desc: "Automate workflows and master modern DevOps tools. Learn CI/CD pipelines, Docker, Kubernetes, AWS, and monitoring to streamline software delivery.",
            },
            {
              title: "AI & Machine Learning",
              desc: "Dive into AI models, supervised/unsupervised learning, deep learning with TensorFlow, and practical ML projects to prepare for the AI-driven future.",
            },
            {
              title: "Data Analytics",
              desc: "Transform raw data into powerful insights. Learn SQL, Excel, Tableau, and visualization techniques used by top companies to make data-driven decisions.",
            },
            {
              title: "Data Science Pro",
              desc: "Master Python, statistics, machine learning, and predictive modeling. Work on real datasets and become a data scientist who solves real-world challenges.",
            },
          ].map((course, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">{course.title}</h3>
              <p className="text-gray-300 text-sm">{course.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 sm:px-16 py-16 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          💳 Simple, Transparent Pricing — Start Free, Upgrade Anytime
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold mb-4 text-white">Free Plan</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Access to free learning modules</li>
              <li>Weekly updates and tutorials</li>
              <li>Community support forum</li>
            </ul>
            <button className="mt-6 w-full bg-orange-600 text-white py-3 rounded-2xl hover:bg-orange-700 transition">
              Get Started Free
            </button>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl shadow border-2 border-orange-600">
            <h3 className="text-2xl font-semibold mb-4 text-white">Pro Plan</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Access to all premium courses</li>
              <li>Hands-on projects with mentors</li>
              <li>Personalized 1:1 doubt support</li>
              <li>Early access to new course releases</li>
            </ul>
            <button className="mt-6 w-full bg-orange-600 text-white py-3 rounded-2xl hover:bg-orange-700 transition">
              Upgrade Now
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 sm:px-16 py-20 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          🌟 Ready to Transform Your Career?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
          Join thousands of learners who trusted{" "}
          <span className="font-semibold text-orange-500">codeXdev</span> to achieve their career goals. Start learning today and build the skills that top companies are hiring for.
        </p>
        <Link
          to="/courses"
          className="bg-orange-600 text-white font-semibold px-8 py-4 rounded-2xl shadow hover:bg-orange-700 transition"
        >
          Start Learning Today
        </Link>
      </section>
    </div>
  );
};

export default Home;
