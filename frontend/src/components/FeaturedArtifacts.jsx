import { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await fetch(
          "https://historical-artifacts-tracker-peach.vercel.app/artifacts"
        );
        const data = await res.json();
        const sorted = data.sort((a, b) => b.likes - a.likes).slice(0, 8);
        setArtifacts(sorted);
      } catch (err) {
        console.error("Failed to fetch artifacts:", err);
      }
    };

    fetchArtifacts();
  }, []);

  return (
    <div
      className="relative mt-12 px-4 py-14 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/8 via-transparent to-amber-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(351,191,36,0.1),transparent_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_30%)]" />

      <h2 className="text-3xl font-bold text-center mb-7 text-white ">
        Featured{" "}
        <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
          Artifacts
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {artifacts.map((artifact) => (
          <div
            key={artifact._id}
            className="bg-gradient-to-br from-amber-500/10 via-transparent to-amber-900/40 shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <img
              src={artifact.imageUrl}
              alt={artifact.artifactName}
              className="h-[200px] w-full object-contain"
            />
            <div className="p-4">
              <h3 className="text-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-2">
                {artifact.artifactName}
              </h3>
              <p className="text-gray-200 dark:text-gray-100 text-sm mb-3">
                {artifact.description.length > 80
                  ? artifact.description.slice(0, 80) + "..."
                  : artifact.description}
              </p>
              <p className="text-blue-500 font-semibold mb-4">
                ❤️ {artifact.likes} Likes
              </p>
              <Link
                to={`/artifacts/${artifact._id}`}
                className=" btn-secondary relative z-10"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          to={`/allArtifacts`}
          className=" btn-secondary relative z-10 "
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArtifacts;
