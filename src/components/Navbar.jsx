// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
// import { MapPin } from "lucide-react";
// import React from "react";
// import { FaCaretDown } from "react-icons/fa";
// import { IoCarOutline } from "react-icons/io5";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   const location = false;

//   const navLinkStyle = ({ isActive }) =>
//     `cursor-pointer ${
//       isActive ? "border-b-2 border-red-500 transition-all" : "text-black"
//     }`;

//   return (
//     <div className="bg-white py-3 shadow-2xl">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/* Logo + Location */}
//         <div className="flex gap-7 items-center">
//           <Link to="/" className="flex items-center">
//             <h1 className="font-bold text-3xl">
//               <span className="text-red-500 font-serif">E</span>Commerce
//             </h1>
//           </Link>

//           <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
//             <MapPin className="text-red-500" />
//             <span className="font-semibold">
//               {location ? "Your Address" : "Add Address"}
//             </span>
//             <FaCaretDown />
//           </div>
//         </div>

//         {/* Menu */}
//         <nav>
//           <ul className="flex gap-7 items-center text-xl font-semibold">
//             <li>
//               <NavLink to="/" className={navLinkStyle}>
//                 Home
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/products" className={navLinkStyle}>
//                 Products
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/about" className={navLinkStyle}>
//                 About
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/contact" className={navLinkStyle}>
//                 Contact
//               </NavLink>
//             </li>
//           </ul>
//           <Link to="/cart" className="relative ml-7">
//             <IoCarOutline className="h-7 w-7" />
//             <span className="bg-red-500 px-2 rounded-full absolute top-3 right-3 text-white">
//               0
//             </span>
//           </Link>
//           <div>
//             <SignedOut>
//               <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPin, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const { cartItems } = useCart();
  console.log(cartItems);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinkStyle = ({ isActive }) =>
    `block py-2 ${
      isActive ? "text-red-500 border-b-2 border-red-500" : "text-gray-700"
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Location */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-red-500 font-serif">E</span>Commerce
            </Link>

            {/* Location (hide on small screens) */}
            <div className="hidden md:flex items-center gap-1 cursor-pointer text-gray-600">
              <MapPin className="text-red-500" size={18} />
              <span className="font-medium">
                {location ? (
                  <div className="space-y-2">
                    <p>{location.conty}</p>
                    <p>{location.state}</p>
                  </div>
                ) : (
                  "Add address"
                )}
              </span>
              <FaCaretDown onClick={() => setOpenDropdown(!openDropdown)} />
            </div>
            {openDropdown ? (
              <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
                <h1 className="font-semibold mb-4 text-xl flex justify-between">
                  Change Location
                </h1>
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
                >
                  Detect My Location
                </button>
              </div>
            ) : null}
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkStyle}>
              Products
            </NavLink>
            <NavLink to="/about" className={navLinkStyle}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkStyle}>
              Contact
            </NavLink>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <IoCartOutline className="h-7 w-7" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            </Link>

            {/* Auth */}
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-4 py-1 rounded-md" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={navLinkStyle}
          >
            Contact
          </NavLink>

          <div className="flex items-center gap-4 mt-3">
            <Link to="/cart" className="relative">
              <IoCartOutline className="h-7 w-7" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            </Link>

            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-4 py-1 rounded-md" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
