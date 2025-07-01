import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

import { getMyArtifacts, deleteArtifact } from "../api/artifactsApi";

const MyArtifacts = () => {
  const { user, loading } = use(AuthContext);
  const [myArtifacts, setMyArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !user) return;

    const fetchArtifacts = async () => {
      try {
        const data = await getMyArtifacts(user.accessToken);
        // Filter artifacts by user email or id if API returns all
        const userArtifacts = data.filter(
          (artifact) => artifact.addedBy?.email === user.email
        );
        setMyArtifacts(userArtifacts);
      } catch (err) {
        toast.error("Failed to load artifacts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifacts();
  }, [user, loading]);

  const handleDelete = async (artifactId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this artifact?"
    );
    if (!confirm) return;

    try {
      await deleteArtifact(artifactId, user.accessToken);
      setMyArtifacts((prev) => prev.filter((art) => art._id !== artifactId));
      toast.success("Artifact deleted successfully");
    } catch (err) {
      toast.error(err.message || "An error occurred");
      console.error(err);
    }
  };

  if (isLoading)
    return <span className="loading loading-spinner text-primary"></span>;

  if (!myArtifacts.length)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center h-96 text-center p-4 bg-base-300 rounded-2xl shadow-md mt-7"
      >
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-blue-500 mb-4"
        >
          <Box size={64} strokeWidth={1.5} />
        </motion.div>

        <h2 className="text-2xl font-semibold mb-2">No Artifacts Found</h2>
        <p className="text-gray-500 mb-4">
          Click the "Add Artifact" button to begin tracking your items.
        </p>

        <Link to="/addArtifact">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="btn-secondary relative z-10 rounded-full "
          >
            Add Artifact
          </motion.button>
        </Link>
      </motion.div>
    );

  return (
    <div
      className="work-sans-text p-12 max-w-6xl mx-auto mt-12"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 40%, rgba(0,0,0,0.95) 60%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)] pointer-events-none" />

      <h2 className="text-2xl font-bold mb-4  text-primary-gradient text-center">
        My Artifacts
      </h2>
      <table className="min-w-full border-collapse text-gray-300 border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">
              Historical Context
            </th>
            <th className="border border-gray-300 px-4 py-2">Likes</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myArtifacts.map((artifact) => (
            <tr key={artifact._id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <img
                  src={artifact.imageUrl}
                  alt={artifact.artifactName}
                  className="w-20 h-20 object-cover mx-auto rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/80x80?text=No+Image";
                  }}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {artifact.artifactName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {artifact.historicalContext}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {artifact.likes || 0}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center ">
                <button
                  onClick={() => navigate(`/updateArtifact/${artifact._id}`)}
                  className="btn-secondary relative z-10 text-sm rounded-full"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(artifact._id)}
                  className="btn text-sm rounded-full bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyArtifacts;
