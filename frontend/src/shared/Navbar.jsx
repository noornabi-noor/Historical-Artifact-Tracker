import { motion } from "framer-motion";
import { use, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/artifact_logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("✅ Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-primary underline underline-offset-4"
      : "text-white hover:text-primary";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allArtifacts" className={navLinkClass}>
          All Artifacts
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/addArtifact" className={navLinkClass}>
            Add Artifact
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink to="/myArtifacts" className={navLinkClass}>
            My Artifacts
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink to="/likedArtifacts" className={navLinkClass}>
            My Favourite Artifacts
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar work-sans-text bg-black/90 shadow-2xl mx-auto text-white"> 
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center work-sans-text gap-2">
          <img src={logo} className="w-12 h-12" alt="logo" />
          <a className="btn btn-ghost text-xl hidden md:inline-flex">
            Historical{" "}
            <motion.span
              animate={{ color: ["#0000FF", "#FF0000", "#00FF00"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Artifacts
            </motion.span>{" "}
            Tracker
          </a>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">{links}</ul>
      </div>

      <div className="navbar-end gap-1.5 md:gap-3">
        {user ? (
          <>
            <div className="relative group mr-3 md:mr-5">
              <div className="avatar w-7 md:w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Link to="/myProfile">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User Avatar"}
                    className="rounded-full cursor-pointer w-10 h-10"
                  />
                </Link>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {user.displayName || "No Name"}
              </div>
            </div>

            <button onClick={handleLogout} className="btn btn-sm md:btn-md rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-700 text-black font-bold text-lg shadow-xl hover:scale-105 hover:from-amber-400 hover:to-amber-600 transition-all duration-300 border border-amber-100/20">
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname === "/register" ? (
              <NavLink className="btn btn-sm md:btn-md rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-700 text-black font-bold text-lg shadow-xl hover:scale-105 hover:from-amber-400 hover:to-amber-600 transition-all duration-300 border border-amber-100/20" to="/register">
                Register
              </NavLink>
            ) : (
              <NavLink className="btn btn-sm md:btn-md rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-700 text-black font-bold text-lg shadow-xl hover:scale-105 hover:from-amber-400 hover:to-amber-600 transition-all duration-300 border border-amber-100/20" to="/login">
                Login
              </NavLink>
            )}
          </>
        )}

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="p-2 md:p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? (
            <span className="text-yellow-300 text-lg md:text-xl">☀️</span>
          ) : (
            <span className="text-gray-700 text-lg md:text-xl">🌙</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
