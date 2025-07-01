import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import david from "../assets/artifacts_img/arch_Sandy_DavidDye.jpg";
import { motion } from "framer-motion";

import { getLikedArtifacts } from "../api/getLikedArtifacts";
import { Box } from "lucide-react";

const LikedArtifacts = () => {
  const { user } = use(AuthContext);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        //const accessToken = await getIdToken(auth.currentUser);
        const data = await getLikedArtifacts(user.email, user.accessToken);
        setArtifacts(data);
      } catch (err) {
        console.error("Error loading artifacts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchArtifacts();
    }
  }, [user]);

  if (loading)
    return <span className="loading loading-spinner text-primary"></span>;

  if (!artifacts.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center h-96 text-center p-6 bg-base-300 rounded-2xl shadow-lg mt-10"
      >
        {/* Bouncing Icon */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-blue-500 mb-5"
        >
          <Box size={64} strokeWidth={1.5} />
        </motion.div>

        {/* Message Title */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          No Favorites Yet
        </h2>

        {/* Message Subtext */}
        <p className="text-gray-500 max-w-md">
          You haven’t added any artifacts to your favorites list. Click the
          button below to start adding your favorite items.
        </p>

        {/* CTA Button */}
        <Link to="/allArtifacts" className="mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Browse Artifacts
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div
      className="p-14"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 40%, rgba(0,0,0,0.95) 60%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />

      <h2 className="text-2xl font-bold mb-6 text-center text-primary-gradient">Liked Artifacts</h2>
      <div className="overflow-x-auto text-gray-300">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-500">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Historical Context</th>
              <th className="border p-2">Likes</th>
            </tr>
          </thead>
          <tbody>
            {artifacts.map((artifact) => (
              <tr key={artifact._id} className="text-center">
                <td className="border p-2">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.artifactName}
                    className="h-16 w-16 object-cover mx-auto cursor-pointer transition duration-200 hover:scale-105"
                    onClick={() => navigate(`/artifacts/${artifact._id}`)}
                  />
                </td>

                <td className="border p-2 font-semibold">
                  {artifact.artifactName}
                </td>
                <td className="border p-2">{artifact.historicalContext}</td>
                <td className="border p-2">{artifact.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LikedArtifacts;
