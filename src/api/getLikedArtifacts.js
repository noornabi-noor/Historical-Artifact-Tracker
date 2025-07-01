export const getLikedArtifacts = (email, accessToken) => {
  return fetch(`https://historical-artifacts-tracker-peach.vercel.app/likedArtifacts/${email}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch liked artifacts");
    }
    return res.json();
  });
};
