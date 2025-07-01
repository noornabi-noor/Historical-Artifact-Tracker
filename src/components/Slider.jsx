// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { Link } from "react-router";

// const Slider = () => {
//   const [artifacts, setArtifacts] = useState([]);

//   useEffect(() => {
//     fetch("https://historical-artifacts-tracker-peach.vercel.app/artifacts")
//       .then((res) => res.json())
//       .then((data) => {
//         const sorted = data.sort((a, b) => b._id.localeCompare(a._id));
//         setArtifacts(sorted);
//       });
//   }, []);

//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//       slidesToSlide: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 768 },
//       items: 2,
//       slidesToSlide: 2,
//     },
//     mobile: {
//       breakpoint: { max: 768, min: 0 },
//       items: 1,
//       slidesToSlide: 1,
//     },
//   };

//   return (
//     <div className="work-sans-text max-w-6xl mx-auto px-4 py-10 mt-7 bg-base-300 shadow-2xl">
//       <div className="flex justify-center mb-7">
//         <h2 className="text-3xl font-bold mb-6 text-center">
//           <motion.span
//             animate={{
//               color: ["#33ff33", "#8a33ff", "#ff5733"],
//               transition: { duration: 2, repeat: Infinity },
//             }}
//           >
//             NEW
//           </motion.span>{" "}
//           Added Artifacts
//         </h2>
//       </div>

//       <Carousel
//         responsive={responsive}
//         infinite={true}
//         autoPlay={true}
//         autoPlaySpeed={3000}
//         keyBoardControl={true}
//         removeArrowOnDeviceType={["tablet", "mobile"]}
//       >
//         {artifacts.map((artifact) => (
//           <div key={artifact._id} className="p-4">
//             <Link to={`/artifacts/${artifact._id}`}>
//               <img
//                 src={artifact.imageUrl}
//                 alt={artifact.artifactName}
//                 className="w-full h-64 object-cover rounded-xl shadow-lg"
//               />
//               <h3 className="text-xl font-semibold mt-3 text-primary">
//                 {artifact.artifactName}
//               </h3>
//               <p className="text-sm text-gray-900 dark:text-gray-100">
//                 {artifact.historicalContext.slice(0, 80)}...
//               </p>
//             </Link>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default Slider;



import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router";

const Slider = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    fetch("https://historical-artifacts-tracker-peach.vercel.app/artifacts")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b._id.localeCompare(a._id));
        setArtifacts(sorted);
      });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

return (
  <div
    className="relative mt-12 px-4 py-14 rounded-2xl overflow-hidden shadow-2xl"
    style={{
      background:
        "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
    }}
  >
    {/* Matching radial amber background overlays from FrequentlyAsk */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)]" />

    {/* Content layer */}
    <div className="relative z-10 max-w-6xl mx-auto work-sans-text">
      <div className="flex justify-center mb-10">
        <motion.h2
          className="text-4xl font-bold text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            animate={{
              color: ["#fbbf24", "#facc15", "#fcd34d"],
              transition: { duration: 2, repeat: Infinity },
            }}
          >
            NEW
          </motion.span>{" "}
          Added Artifacts
        </motion.h2>
      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3500}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {artifacts.map((artifact) => (
          <motion.div
            key={artifact._id}
            className="p-3"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
          >
            <Link to={`/artifacts/${artifact._id}`}>
              <div className="bg-linear-gradient(15deg, rgba(20,0,0,0.95) 10%, rgba(50,20,40,0.98) 70%, rgba(0,0,0,0.95) 90% dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-[400px] flex flex-col">
                
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)]" />

                <img
                  src={artifact.imageUrl}
                  alt={artifact.artifactName}
                  className="w-full h-52 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-gradient dark:text-white mb-1">
                      {artifact.artifactName}
                    </h3>
                    <p className="text-sm text-gray-200 dark:text-gray-300 line-clamp-3">
                      {artifact.historicalContext}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-primary font-semibold">
                    View Details →
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </Carousel>
    </div>
  </div>
);



};

export default Slider;
