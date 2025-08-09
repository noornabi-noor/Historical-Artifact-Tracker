import React from "react";
import { motion } from "framer-motion";
import artifact2 from "../assets/artifacts_img/art2.jpg";
import artifactGif from "../assets/artifacts_img/art_gif.webp";

const Banner = () => {
  return (
    <div
      className="work-sans-text min-h-screen px-4 py-10 sm:py-16 mt-7 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0f0f, #1e1e1e 50%, #0f0f0f)",
      }}
    >
      {/* Glowing gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,165,0,0.05),transparent_50%)]" />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

      <div className="relative z-10 hero-content flex flex-col-reverse lg:flex-row items-center gap-8">
        
        {/* Left Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 1.5 } }}
            className="text-4xl sm:text-5xl font-bold text-white"
          >
            Discover the{" "}
            <motion.span
              animate={{
                color: ["#ffbd33", "#33ffbb", "#ff33f6"],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              Stories
            </motion.span>{" "}
            behind the{" "}
            <motion.span
              animate={{
                color: ["#33ffbb", "#ff33f6", "#ffbd33"],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              Stones
            </motion.span>
            !
          </motion.h1>

          <p className="py-6 text-gray-300 sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Discover iconic artifacts like the Rosetta Stone and Antikythera
            Mechanism. Share your finds, explore hidden histories, and help
            preserve our past.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
            {["🔍 Browse", "📝 Contribute", "❤️ Like", "📚 Learn"].map((text, i) => (
              <motion.p
                key={i}
                whileHover={{ scale: 1.1 }}
                className="font-bold px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-lg"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
        

        {/* Right Image Section */}
        <div className="flex-1 flex flex-col items-center gap-6 mt-6 sm:mt-10">
          <motion.img
            src={artifactGif}
            animate={{ y: [30, 60, 30] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-40 sm:w-56 md:w-72 rounded-t-3xl rounded-br-3xl border-l-8 border-b-8 border-amber-500 shadow-xl"
            alt="Artifact GIF"
          />
          <motion.img
            src={artifact2}
            animate={{ x: [20, 40, 20] }}
            transition={{ duration: 10, delay: 3, repeat: Infinity }}
            className="w-40 sm:w-56 md:w-72 rounded-t-3xl rounded-br-3xl border-l-8 border-b-8 border-amber-500 shadow-xl"
            alt="Artifact Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
