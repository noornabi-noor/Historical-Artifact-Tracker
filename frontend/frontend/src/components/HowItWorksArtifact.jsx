import React from 'react';
import { FaRegUser, FaSearchLocation, FaUpload, FaBookOpen } from 'react-icons/fa';

const steps = [
  {
    icon: <FaRegUser className="text-3xl text-white dark:text-gray-100" />,
    title: 'Create an Account',
    description: 'Register to start tracking and contributing historical artifacts worldwide.',
  },
  {
    icon: <FaSearchLocation className="text-3xl text-white dark:text-gray-100" />,
    title: 'Explore Artifacts',
    description: 'Browse and discover artifacts by region, era, or cultural significance.',
  },
  {
    icon: <FaUpload className="text-3xl text-white dark:text-gray-100" />,
    title: 'Upload & Track',
    description: 'Add new artifacts with metadata and track changes in their condition or location.',
  },
  {
    icon: <FaBookOpen className="text-3xl text-white dark:text-gray-100" />,
    title: 'Learn & Share',
    description: 'Access detailed historical context and contribute your knowledge to the community.',
  },
];

const HowItWorksArtifact = () => {
  return (
   <div
      className="relative mt-12 px-4 py-14 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background:
          "linear-gradient(15deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 80%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)]" />

      <h2 className="text-3xl font-bold text-center mb-8 text-white">How It <span className='bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent'>Works?</span>  </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center  shadow-2xl p-6 rounded-2xl"
            style={{
        background:
          "linear-gradient(100deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 40%, rgba(0,0,0,0.95) 100%)",
      }}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl text-primary font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-200 dark:text-gray-100">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksArtifact;
