import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ArtifactCard from "../components/ArtifactCard";

const AllArtifacts = () => {
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://historical-artifacts-tracker-peach.vercel.app/artifacts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setAllArtifacts(data);
        setArtifacts(data);
      })
      .catch((error) => console.error("Error fetching artifacts:", error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = searchText.trim().toLowerCase();
    if (!trimmedSearch) {
      setArtifacts(allArtifacts);
      return;
    }

    const filtered = allArtifacts.filter((item) => {
      return Object.values(item).some(
        (val) =>
          typeof val === "string" && val.toLowerCase().includes(trimmedSearch)
      );
    });

    console.log("Filtered results:", filtered);

    if (filtered.length > 0) {
      setArtifacts(filtered);
    } else {
      setArtifacts([]);
      alert("No artifacts found.");
    }
  };

  return (
    // <div className="work-sans-text mt-6 bg-linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%">
    //   <div className="text-center mb-8">
    //     <motion.h1
    //       className="text-4xl font-bold text-center text-primary"
    //       animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
    //       transition={{ repeat: Infinity, duration: 2 }}
    //     >
    //       Explore Historical Artifacts
    //     </motion.h1>

    //     <p className="mt-2 max-w-2xl mx-auto">
    //       Discover a curated collection of fascinating historical artifacts from
    //       around the world. Browse through each item to learn more, and click
    //       "View Detail" to explore the full story behind every piece.
    //     </p>
    //   </div>

    //   {/* Search Form */}
    //   <form onSubmit={handleSearch} className="flex justify-center mb-6">
    //     <input
    //       type="text"
    //       value={searchText}
    //       onChange={(e) => setSearchText(e.target.value)}
    //       placeholder="Search artifacts..."
    //       className="border border-gray-300 p-2 rounded-l w-64"
    //     />
    //     <button
    //       type="submit"
    //       className="btn-secondary relative z-10 rounded"
    //     >
    //       Search
    //     </button>
    //   </form>

    //   <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
    //     {artifacts.map((artifact) => (
    //       <ArtifactCard key={artifact._id} artifact={artifact} />
    //     ))}
    //   </div>
    // </div>

    <div
      className="sm:px-4  relative mt-12 px-4 py-14 rounded-2xl overflow-hidden shadow-2xl text-gray-200"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Table for desktop */}

      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)]" />

      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl font-bold text-center text-primary"
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Explore Historical Artifacts
        </motion.h1>

        <p className="mt-2 max-w-2xl mx-auto text-gray-500 dark-text-gray-100">
          Discover a curated collection of fascinating historical artifacts from
          around the world. Browse through each item to learn more, and click
          "View Detail" to explore the full story behind every piece.
        </p>
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Context
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Likes
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {artifacts.length > 0 ? (
              artifacts.map((artifact) => (
                <tr key={artifact._id} className="border border-gray-300">
                  <td className="border border-gray-300 py-3 px-4">
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.artifactName}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {artifact.artifactName}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {artifact.type}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {artifact.historicalContext}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {artifact.description?.length > 50
                      ? artifact.description.slice(0, 50) + "..."
                      : artifact.description}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    ❤️ {artifact.likes}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    <a
                      href={`/artifacts/${artifact._id}`}
                      className="btn-secondary relative z-10 text-sm btn-lg"
                    >
                      Show Details
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border border-gray-300 text-center py-6 text-gray-500"
                >
                  No artifacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for Mobile */}
      <div className="block sm:hidden space-y-4 mt-4">
        {artifacts.length > 0 ? (
          artifacts.map((artifact) => (
            <div
              key={artifact._id}
              className="border border-gray-300 rounded-md p-4 space-y-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={artifact.imageUrl}
                  alt={artifact.artifactName}
                  className="h-16 w-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {artifact.artifactName}
                  </p>
                  <p className="text-gray-600 text-sm">{artifact.type}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Context:</strong> {artifact.historicalContext}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Description:</strong>{" "}
                {artifact.description?.length > 50
                  ? artifact.description.slice(0, 50) + "..."
                  : artifact.description}
              </p>
              <p className="text-sm text-gray-700">❤️ {artifact.likes}</p>
              <a
                href={`/artifacts/${artifact._id}`}
                className="btn-secondary relative z-10 text-sm btn-sm"
              >
                Show Details
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No artifacts found.</p>
        )}
      </div>
    </div>
  );
};

export default AllArtifacts;
