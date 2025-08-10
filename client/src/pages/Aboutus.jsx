import HomeLayout from "../layouts/HomeLayout";

const Aboutus = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col md:flex-col items-center gap-10 mx-4 md:mx-10">
        <div className="flex flex-col text-white pl-4 pr-4 pt-10 md:pl-10 md:pt-20">
          <div className="flex flex-col md:flex-row items-center gap-10 mx-4 md:mx-10">
            {/* Left Section */}
            <section className="w-full md:w-1/2 space-y-6 md:space-y-10">
              <h1 className="text-3xl md:text-5xl text-yellow-500 font-semibold">
                Affordable and Quality Education
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                At <strong>codeXdev</strong>,<br /> we empower learners and educators
                to thrive in the digital era through innovative, inclusive, and
                accessible education. Our mission goes beyond teaching—we foster
                collaboration, ignite creativity, and cultivate future-ready
                skills. By connecting minds across the globe, we are building a
                vibrant community dedicated to continuous growth, shared
                knowledge, and the transformation of education for a better
                tomorrow.
              </p>
            </section>

            {/* Right Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/2211.w026.n002.2759B.p1.2759.jpg"
                className="w-full drop-shadow-2xl border rounded-xl"
                alt="about main page"
                id="test1"
                style={{
                  filter: "",
                }}
              />
            </div>
          </div>
        </div>



        {/* carousel */}
       
        <div className="carousel m-auto w-1/2 my-4">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                
              <img
                className="w-70 rounded-full shadow-2xl"
                src="../../public/mern.avif"
                alt="mern"
              />
            
              <p className="text-xl text-gray-200 italic">
               "Crafting scalable solutions with Mongo, Express, React & Node — from concept to cloud."
              </p>
             
              <h3 className="text-2xl font-semibold">Full Stack Development</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide5" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            
              <img
               className="w-70 rounded-full shadow-2xl"
                src="../../public/devops.png"
                alt="DevOps"
              />
              
              <p className="text-xl text-gray-200 italic">
                "DevOps is the art of delivering innovation at speed — where code, culture, and automation flow as one."
              </p>
             
              <h3 className="text-2xl font-semibold">DevOps</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            
              <img
                className="w-70 rounded-full shadow-2xl"
                src="../../public/C++_Logo.svg"
                alt="einstein"
              />
            
              <p className="text-xl text-gray-200 italic">
                "Mastering logic through DSA, sculpting efficiency with every line of C++."
              </p>
              
              <h3 className="text-2xl font-semibold">DSA using C++</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
          
              <img
               className="w-70 rounded-full shadow-2xl"
                src="../../public/datascience.jpg"
                alt="Steve Jobs"
              />
             
              <p className="text-xl text-gray-200 italic">
                Learn the Language of Data — Speak with Insights.
              </p>
             
              <h3 className="text-2xl font-semibold">Data Science</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide5" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
             
              <img
                className="w-70 rounded-full shadow-2xl"
                src="../../public/aiml.png"
                alt="Bill Gates"
              />
           
              <p className="text-xl text-gray-200 italic">
              "From Data to Decisions — Master AI & ML."
              </p>
            
              <h3 className="text-2xl font-semibold">AI & ML</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Aboutus;
