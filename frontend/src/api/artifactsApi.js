// API function to get user's artifacts
export const getMyArtifacts = (accessToken) => {
  return fetch(`https://historical-artifacts-tracker-peach.vercel.app/artifacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch artifacts");
    }
    return res.json();
  });
};


// API function to delete artifact by id
export const deleteArtifact = (id, accessToken) => {
  return fetch(`https://historical-artifacts-tracker-peach.vercel.app/artifacts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(async (res) => {
    if (!res.ok) {
      let errorMessage = "Failed to delete artifact";
      try {
        const errorData = await res.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch {}
      throw new Error(errorMessage);
    }
    return res.json();
  });
};



export const addArtifact = (artifactToAdd, accessToken) => {
  return fetch("https://historical-artifacts-tracker-peach.vercel.app/artifacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(artifactToAdd),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to add artifact");
    }
    return res.json();
  });
};


// API function to like or unlike an artifact
export const toggleLikeArtifact = (artifactId, userEmail, accessToken) => {
  return fetch(`https://historical-artifacts-tracker-peach.vercel.app/artifacts/${artifactId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ userEmail }),
  }).then(async (res) => {
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to toggle like");
    }
    return result; 
  });
};


// API function to update artifact by ID 
export const updateArtifact = (id, updatedArtifact, accessToken) => {
  return fetch(`https://historical-artifacts-tracker-peach.vercel.app/artifacts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updatedArtifact),
  }).then(async (res) => {
    if (!res.ok) {
      let errorMessage = "Failed to update artifact";
      try {
        const errorData = await res.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch {}
      throw new Error(errorMessage);
    }
    return res.json();
  });
};
