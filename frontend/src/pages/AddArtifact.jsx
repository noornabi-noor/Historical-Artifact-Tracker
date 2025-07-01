import React, { useState } from "react";
import UseAuth from "../hooks/UseAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

import { addArtifact } from "../api/artifactsApi";
import { getAuth } from "firebase/auth";

const AddArtifact = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    artifactName: "",
    imageUrl: "",
    type: "Tools",
    historicalContext: "",
    description: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  const [loading, setLoading] = useState(false);

  const artifactTypes = ["Tools", "Weapons", "Documents", "Writings", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.artifactName.trim()) {
      toast.error("Artifact Name is required");
      return;
    }
    if (!formData.imageUrl.trim()) {
      toast.error("Artifact Image URL is required");
      return;
    }

    setLoading(true);

    const artifactToAdd = {
      ...formData,
      addedBy: {
        name: user?.displayName || "Unknown",
        email: user?.email || "Unknown",
      },
      likes: 0,
      likedBy: [],
    };

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      }

      const token = await currentUser.getIdToken();

      await addArtifact(artifactToAdd, token);

      toast.success("Artifact added successfully!");

      setFormData({
        artifactName: "",
        imageUrl: "",
        type: "Tools",
        historicalContext: "",
        description: "",
        createdAt: "",
        discoveredAt: "",
        discoveredBy: "",
        presentLocation: "",
      });

      setTimeout(() => {
        navigate("/allArtifacts");
      }, 4000);
    } catch (error) {
      toast.error(`Error adding artifact: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center p-10">
        <p className="text-red-500 font-semibold">
          You must be logged in to add an artifact.
        </p>
      </div>
    );
  }

  return (
    <div
      className="work-sans-text max-w-3xl mx-auto p-6 mt-7 border shadow rounded-md text-gray-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)] pointer-events-none" />

      <h2 className="text-3xl font-bold mb-6 text-center text-primary-gradient">
        Add New Artifact
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Artifact Name</label>
          <input
            type="text"
            name="artifactName"
            value={formData.artifactName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Artifact Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Artifact Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            {artifactTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Historical Context</label>
          <textarea
            name="historicalContext"
            value={formData.historicalContext}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Created At (e.g., "100 BC")
          </label>
          <input
            type="text"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Discovered At (e.g., "1799")
          </label>
          <input
            type="text"
            name="discoveredAt"
            value={formData.discoveredAt}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Discovered By</label>
          <input
            type="text"
            name="discoveredBy"
            value={formData.discoveredBy}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Present Location</label>
          <input
            type="text"
            name="presentLocation"
            value={formData.presentLocation}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Added By</label>
          <input
            type="text"
            value={user.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-900 dark:text-gray-600 cursor-not-allowed"
          />
          <p className="text-sm mt-1">Name</p>
        </div>

        <div>
          <input
            type="email"
            value={user.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-50 dark:text-gray-600 dark:bg-gray-900 cursor-not-allowed"
          />
          <p className="text-sm mt-1">Email</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-secondary relative z-10 w-full items-center justify-center "
        >
          {loading && <span className="loading loading-spinner"></span>}
          {loading ? "Adding..." : "Add Artifact"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddArtifact;
