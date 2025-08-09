import React from "react";
import { Link } from "react-router";

const ArtifactCard = ({ artifact }) => {
  const {
    _id,
    artifactName,
    imageUrl,
    type,
    historicalContext,
    applicationDeadline,
    description,
    likes
  } = artifact;

  return (
    <div>
      <div className="work-sans-text card bg-base-100 w-96 h-[450px] shadow-sm items-center">
        
        <figure className="h-[300px] overflow-hidden">
          <img
            className="h-full w-full object-contain"
            src={artifact.imageUrl}
            alt={artifact.artifactName}
          />
        </figure>


        <div className="card-body">
          <h2 className="card-title text-primary">
            {artifact.artifactName}
            <div className="badge bg-blue-600 text-white">{artifact.type}</div>
          </h2>
          <h3 className="text-14px font-bold">
            {artifact.historicalContext}
          </h3>
          <p>
            {artifact.description?.length > 80
                  ? artifact.description.slice(0, 80) + "..."
                  : artifact.description}
          </p>
          <div className="card-actions justify-between ">
            <div className="badge badge-outline">❤️: {artifact.likes}</div>

            <Link to={`/artifacts/${_id}`}>
              <div className="badge badge-outline cursor-pointer">
                Show Details
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactCard;
