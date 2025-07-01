import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import UseAuth from "../hooks/UseAuth";
import { motion } from "motion/react";

import { toggleLikeArtifact } from "../api/artifactsApi";

const ArtifactDetails = () => {
  const artifact = useLoaderData();

  const { user } = UseAuth();

  const {
    _id,
    artifactName,
    imageUrl,
    type,
    historicalContext,
    description,
    createdAt,
    discoveredAt,
    discoveredBy,
    presentLocation,
    addedBy,
    likes: initialLikes,
    likedBy = [],
  } = artifact;

  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email && likedBy.includes(user.email)) {
      setLiked(true);
    }
  }, [user, likedBy]);

  const handleLikeToggle = async () => {
    if (!user) {
      alert("You must be logged in to like!");
      return;
    }

    setLoading(true);

    try {
      const token = await user.getIdToken();

      const result = await toggleLikeArtifact(_id, user.email, token);

      setLiked(result.liked);
      setLikes((prevLikes) => (result.liked ? prevLikes + 1 : prevLikes - 1));
    } catch (err) {
      console.error("Like toggle failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="work-sans-text "
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 40%, rgba(0,0,0,0.95) 60%)",
      }}
    >
      <div className="text-center mb-8 mt-12">
        <motion.h1
          className="text-4xl  font-extrabold text-center bg-clip-text text-primary-gradient"
          animate={{ opacity: [0, 1], scale: [0.95, 1] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Discover Artifact Details – Exclusive Access
        </motion.h1>

        <p className="mt-3 max-w-3xl text-gray-300 mx-auto text-lg">
          Dive deep into the rich history behind each artifact. As a valued
          member, you can explore comprehensive details, like your favorite
          pieces, and see your likes reflected in real time.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card  shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)] pointer-events-none" />

          <figure className="max-h-[700px] overflow-hidden">
            <img
              src={imageUrl}
              alt={artifactName}
              className="object-cover w-full"
            />
          </figure>
          <div className="card-body space-y-3 text-gray-200">
            <h1 className="text-primary-gradient text-2xl">{artifactName}</h1>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLikeToggle}
                className={`btn btn-outline ${
                  liked
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black"
                } gap-2`}
                disabled={loading}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
                {liked ? "Liked" : "Like"}
              </button>

              <span className="text-lg">
                {likes} {likes === 1 ? "Like" : "Likes"}
              </span>
            </div>

            <p className="text-md text-gray-200">
              <strong>Type:</strong> {type}
            </p>
            <p className="text-md">
              <strong>Historical Context:</strong> {historicalContext}
            </p>
            <p className="text-md">
              <strong>Description:</strong> {description}
            </p>
            <p className="text-md">
              <strong>Created At:</strong> {createdAt}
            </p>
            <p className="text-md">
              <strong>Discovered At:</strong> {discoveredAt}
            </p>
            <p className="text-md">
              <strong>Discovered By:</strong> {discoveredBy}
            </p>
            <p className="text-md">
              <strong>Present Location:</strong> {presentLocation}
            </p>
            <p className="text-md">
              <strong>Added By:</strong> {addedBy?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
