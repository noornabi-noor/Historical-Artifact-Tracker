import React from "react";
import { useRouteError } from "react-router";
import errorPage from "../assets/artifacts_img/404-error-page.gif";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="work-sans-text mt-5 relative w-fit mx-auto overflow-hidden">
      <img src={errorPage} alt="Error Page" />

      <div className="absolute inset-0 flex flex-col items-center justify-start text-center text-3xl font-extrabold p-5 rounded-xl ">
        <motion.h1
          className="text-4xl font-bold mb-4"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🤯 Oops!
        </motion.h1>

        <p className="text-lg">Sorry, an unexpected error has occurred.</p>

        <motion.p
          className="text-rose-500 mt-4"
          animate={{
            x: [0, 10, -10, 10, -10, 0], 
            rotate: [0, 5, -5, 5, -5, 0], 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {error.status} {error.statusText || error.message}
        </motion.p>
      </div>
    </div>
  );
};

export default ErrorPage;
