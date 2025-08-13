import React from "react";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-100 p-6">
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto"
        aria-labelledby="notfound-heading"
      >
        <div className="bg-gradient-to-br from-white/6 via-white/3 to-white/4 backdrop-blur-md border border-white/6 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              className="flex-shrink-0"
              initial={{ scale: 0.96 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              aria-hidden
            >
              <svg
                width="160"
                height="160"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="calming eye illustration"
              >
                <defs>
                  <radialGradient id="g1" cx="50%" cy="40%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.08" />
                    <stop
                      offset="100%"
                      stopColor="#0ea5a4"
                      stopOpacity="0.02"
                    />
                  </radialGradient>
                  <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>

                <g filter="url(#f1)">
                  <ellipse cx="100" cy="100" rx="84" ry="48" fill="url(#g1)" />
                </g>

                <motion.path
                  d="M20 100C50 50 150 50 180 100C150 150 50 150 20 100Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />

                <motion.circle
                  cx="100"
                  cy="100"
                  r="26"
                  fill="#0ea5a4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.98, 1.02, 0.98] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="12"
                  fill="#053e3e"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [1, 0.94, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.6,
                    ease: "easeInOut",
                  }}
                />
                <circle cx="92" cy="92" r="4" fill="#ffffff" opacity="0.9" />
                <ellipse
                  cx="100"
                  cy="126"
                  rx="44"
                  ry="12"
                  fill="rgba(14,165,164,0.06)"
                />
              </svg>
            </motion.div>
            <div className="flex-1">
              <h1
                id="notfound-heading"
                className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
              >
                Oops — Page not found
              </h1>
              <p className="mt-3 text-slate-300 max-w-xl">
                The page you tried to reach doesn’t exist (anymore?) — but don’t
                worry, we designed this page to be relaxing while you decide
                your next move.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 btn-secondary shadow-md text-white font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  Go home
                </a>

                <a
                  href="/allArtifacts"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/10 bg-white/3 text-white hover:bg-white/6 transition"
                >
                  Browse artifacts
                </a>
              </div>

              {/* <form action="/search" method="get" className="mt-6">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="flex rounded-lg overflow-hidden border border-white/6 bg-white/2">
                  <input
                    id="search"
                    name="q"
                    placeholder="Search the collection or site..."
                    className="flex-1 px-4 py-3 bg-transparent placeholder:text-slate-300 text-white focus:outline-none"
                    aria-label="Search the site"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-700
           hover:scale-105 hover:from-amber-400 hover:to-amber-600 text-white font-medium"
                  >
                    Search
                  </button>
                </div>
              </form> */}

              <p className="mt-4 text-sm text-slate-400">
                If you think this is a mistake,{" "}
                <a href="/contact" className="underline text-slate-200">
                  contact support
                </a>{" "}
                and we’ll help you find what you need.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Return to{" "}
            <a href="/" className="underline">
              homepage
            </a>{" "}
            · or try our{" "}
            
              sitemap
           
          </div>
        </div>
      </motion.main>
    </div>
  );
}