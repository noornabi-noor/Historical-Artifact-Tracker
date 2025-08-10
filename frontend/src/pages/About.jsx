import React from "react";

const About = () => {
  return (
    <div className="relative max-w-5xl mx-auto px-8 py-14 bg-base-300 mt-12 rounded-2xl overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.1),transparent_50%)] pointer-events-none" />

      {/* Content */}
      <h1 className="relative text-4xl font-extrabold text-center text-primary mb-12 drop-shadow-md">
        About Historical Artifacts Tracker
      </h1>

      <section className="relative mb-12">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-5 drop-shadow-md">
          Project Overview
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto">
          The <span className="font-semibold">Historical Artifacts Tracker</span> is a modern web application designed to
          catalog and showcase remarkable artifacts from history, such as the
          Rosetta Stone and the Antikythera Mechanism. This platform allows
          users to browse detailed entries, contribute their own findings, and
          interact with artifacts by liking and managing their personal
          collections.
        </p>
      </section>

      <section className="relative mb-12">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-5 drop-shadow-md">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-500 text-lg max-w-3xl mx-auto space-y-3">
          <li>
            Browse a rich database of historical artifacts with images,
            descriptions, and discovery information.
          </li>
          <li>
            Add new artifacts with comprehensive details via a protected form.
          </li>
          <li>
            User authentication with email/password and Google sign-in.
          </li>
          <li>
            Like artifacts to show appreciation and keep track of favorites.
          </li>
          <li>
            Manage your own contributions with options to update or delete entries.
          </li>
          <li>
            Responsive, user-friendly interface designed with accessibility and
            aesthetics in mind.
          </li>
          <li>
            Real-time feedback with toast notifications for all CRUD operations.
          </li>
        </ul>
      </section>

      <section className="relative mb-12">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-5 drop-shadow-md">
          Why Use This Application?
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto space-y-3">
          Whether you are a history enthusiast, researcher, or student, this
          application provides a centralized and engaging way to explore
          humanity’s past. By contributing and interacting with artifacts, you
          become part of a community preserving cultural heritage and sharing
          knowledge for generations to come.
        </p>
      </section>
    </div>
  );
};

export default About;
