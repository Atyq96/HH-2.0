// Importing necessary icons from the react-icons library
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col mt-8 bg-[#121212] justify-center items-center pt-10 px-4 sm:px-10 gap-10 sm:gap-20">
      <div className="flex flex-col sm:flex-row justify-between w-full items-stretch gap-6 sm:gap-0">
        
        {/* Logo Section */}
        <div className="flex justify-center sm:justify-start items-center flex-1">
          <img src="/Logo-HH.svg" alt="Logo" className="h-10 w-10" />
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <h3 className="text-white text-lg font-semibold">Navigation</h3>
          <div className="flex flex-col gap-2">
            <a href="/" className="text-white hover:underline">
              Home
            </a>
            <a href="/about" className="text-white hover:underline">
              About
            </a>
            <a href="#" className="text-white hover:underline">
              Contact
            </a>
          </div>
        </div>

        {/* Credit Section */}
        <div className="flex flex-col items-center gap-2 text-white flex-1">
          <h3 className="text-lg font-semibold">Credit</h3>
          <h4>Amine Atyq</h4>
          <h4>Ayoub Abouchadi</h4>
        </div>

        {/* Social Media Links Section */}
        <div className="flex justify-center sm:justify-end items-center space-x-4 flex-1">
          <a
            href="https://facebook.com"
            target="_blank"
            className="text-white hover:underline"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="text-white hover:underline"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="text-white hover:underline"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Footer Copyright Section */}
      <div className="text-center text-white mt-4">&copy; 2024 ALX-Morocco</div>
    </div>
  );
};

export default Footer;
