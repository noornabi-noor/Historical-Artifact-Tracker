import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

import { updateArtifact } from "../api/artifactsApi";
import { getAuth } from "firebase/auth";

const UpdateArtifact = () => {
  const artifact = useLoaderData();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedArtifact = {
      artifactName: form.artifactName.value,
      artifactImage: form.artifactImage.value,
      artifactType: form.artifactType.value,
      historicalContext: form.historicalContext.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
    };

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      const accessToken = await currentUser.getIdToken();

      const data = await updateArtifact(
        artifact._id,
        updatedArtifact,
        accessToken
      );

      if (data.success) {
        Swal.fire("Success!", "Artifact updated successfully.", "success");
        navigate("/myArtifacts");
      } else {
        Swal.fire("Oops!", "No changes were made or update failed.", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire(
        "Error!",
        error.message || "Failed to update artifact.",
        "error"
      );
    }
  };

  return (
    <div
      className="work-sans-text max-w-xl mx-auto mt-10 p-4 border rounded-md shadow"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 40%, rgba(0,0,0,0.95) 60%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />

      <h2 className="text-2xl font-bold mb-6 text-center text-primary-gradient">Update Artifact</h2>
      <form onSubmit={handleUpdate} className="space-y-4 text-gray-300">
        <input
          name="artifactName"
          defaultValue={artifact.artifactName}
          className="w-full p-2 border"
          placeholder="Artifact Name"
          required
        />
        <input
          name="artifactImage"
          defaultValue={artifact.artifactImage}
          className="w-full p-2 border"
          placeholder="Artifact Image URL"
          required
        />
        <select
          name="artifactType"
          defaultValue={artifact.artifactType}
          className="w-full p-2 border"
          required
        >
          <option value="">Select Type</option>
          <option value="Tools">Tools</option>
          <option value="Weapons">Weapons</option>
          <option value="Documents">Documents</option>
          <option value="Writings">Writings</option>
          <option value="Others">Others</option>
        </select>
        <textarea
          name="historicalContext"
          defaultValue={artifact.historicalContext}
          className="w-full p-2 border"
          placeholder="Historical Context"
          required
        />
        <input
          name="createdAt"
          defaultValue={artifact.createdAt}
          className="w-full p-2 border"
          placeholder="Created At (e.g., 100 BC)"
          required
        />
        <input
          name="discoveredAt"
          defaultValue={artifact.discoveredAt}
          className="w-full p-2 border"
          placeholder="Discovered At (e.g., 1799)"
          required
        />
        <input
          name="discoveredBy"
          defaultValue={artifact.discoveredBy}
          className="w-full p-2 border"
          placeholder="Discovered By"
          required
        />
        <input
          name="presentLocation"
          defaultValue={artifact.presentLocation}
          className="w-full p-2 border"
          placeholder="Present Location"
          required
        />
        <button
          type="submit"
          className="btn-secondary relative z-10 w-full"
        >
          Update Artifact
        </button>
      </form>
    </div>
  );
};

export default UpdateArtifact;
