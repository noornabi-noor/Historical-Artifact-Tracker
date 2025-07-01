import React from "react";
import { Slide } from "react-awesome-reveal";
import globeImage from "../assets/artifacts_img/globe.avif";
import preservationImage from "../assets/artifacts_img/preArti.png";
import dataVerifiedImage from "../assets/artifacts_img/verified.png";

const cardData = [
  {
    title: "Global Discovery",
    description:
      "Explore artifacts from every corner of the globe. Search and track relics by location, time period, or cultural origin.",
    image: globeImage,
  },
  {
    title: "Timeless Preservation",
    description:
      "Help preserve history by tracking condition changes and sharing verified updates about artifact status over time.",
    image: preservationImage,
  },
  {
    title: "Verified Historical Data",
    description:
      "Every artifact is backed by curated metadata including origin, discovery site, historical context, and references.",
    image: dataVerifiedImage,
  },
];

const CardArtifact = () => {
  return (
    <div
      className="relative work-sans-text grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4 py-14 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {cardData.map((card, index) => (
        <Slide key={index} direction="up" cascade damping={0.2}>
          <div className="flex flex-col gap-4 bg-linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%) shadow-2xl p-8 items-center text-center rounded-2xl hover:shadow-lg transition-shadow duration-300 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/18 via-transparent to-amber-900/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(351,191,36,0.1),transparent_80%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_30%)]" />

            <img
              className="w-16 h-16 object-contain"
              src={card.image}
              alt={card.title}
            />
            <h2 className="font-bold text-xl text-primary-gradient">
              {card.title}
            </h2>
            <p className="text-gray-200 dark:text-gray-100 text-sm flex-grow">
              {card.description}
            </p>
          </div>
        </Slide>
      ))}
    </div>
  );
};

export default CardArtifact;
