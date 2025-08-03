const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo/Intro */}
        <div>
          <h2 className="text-xl font-bold mb-2">CodeXDev</h2>
          <p className="text-sm text-gray-400">
            Empowering learners with real-world coding skills. Built by developers, for developers.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            <a href="https://github.com/iaman011" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/iaman011/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:iaman.singh011@gmail.com">Email</a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CodeXDev. Built with 💙 by Aman Singh.
      </div>
    </footer>
  );
};

export default Footer;
