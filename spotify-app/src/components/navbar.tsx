// Importing necessary hooks and icons from react and react-icons libraries
import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Nav = () => {
  // State to manage the menu open/close status
  const [isOpen, setIsOpen] = useState(false);

  // List of navigation items
  const navLists = ["Home", "About"];

  // Ref to keep track of the menu DOM element
  const menuRef = useRef<HTMLDivElement>(null);

  // Function to toggle the menu open/close status
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicks outside the menu to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // useEffect to add/remove event listener based on the menu open/close status
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-black text-white w-full py-2 sm:px-10 flex justify-between items-center">
      <nav className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="/Logo-HH.svg"
              alt="logo"
              width={50}
              height={50}
              className="ml-5"
            />
            <label className="font-bold ml-2">Harmony Hub</label>
          </a>
        </div>

        {/* Navigation items for larger screens */}
        <div className="hidden sm:flex gap-7 justify-center items-center font-bold">
          {navLists.map((nav) => (
            <a
              key={nav}
              className="px-5 text-14px cursor-pointer text-white"
              href={`/${nav === "Home" ? "" : nav}`}
            >
              {nav}
            </a>
          ))}
        </div>

        {/* Hamburger menu button for smaller screens */}
        <div className="sm:hidden flex items-center p-5">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <IoCloseSharp size={24} className="z-0 text-white" />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* Conditional rendering of the menu for smaller screens */}
      {isOpen && (
        <div
          ref={menuRef}
          className="sm:hidden fixed top-0 right-0 w-3/4 h-full bg-black z-50 flex flex-col items-center pt-32"
        >
          {/* Close button inside the menu */}
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none absolute top-10 right-5"
          >
            {isOpen ? (
              <IoCloseSharp size={50} className="z-0 text-white" />
            ) : (
              <FaBars size={24} />
            )}
          </button>
          {/* Navigation items inside the menu */}
          {navLists.map((nav) => (
            <a
              key={nav}
              className="px-5 py-3 text-[20px] cursor-pointer text-white"
              href={`/${nav === "Home" ? "" : nav}`}
              onClick={toggleMenu}
            >
              {nav}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Nav;
