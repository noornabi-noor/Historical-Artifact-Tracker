import { motion } from "framer-motion";
import {
  CircleHelp,
  Shield,
  BookOpen,
  Search,
} from "lucide-react";

const tabs = [
  { icon: <CircleHelp className="h-5 w-5" />, label: "General" },
  { icon: <Shield className="h-5 w-5" />, label: "Authentication" },
  { icon: <BookOpen className="h-5 w-5" />, label: "Collection" },
  { icon: <Search className="h-5 w-5" />, label: "Research" },
];

const FloatingQuestionMark = ({ style }) => (
  <div
    className="absolute text-amber-400/20 text-2xl font-bold"
    style={style}
  >
    ?
  </div>
);

const FrequentlyAsk = () => {
  const qMarks = [
    { left: "68%", top: "44%", rotate: "7deg" },
    { left: "7%", top: "20%", rotate: "-3deg" },
    { left: "85%", top: "38%", rotate: "-6deg" },
    { left: "25%", top: "49%", rotate: "5deg" },
    { left: "45%", top: "58%", rotate: "-8deg" },
    { left: "99%", top: "69%", rotate: "-2deg" },
  ];

  return (
    <section
      className="relative py-20 overflow-hidden mt-12 mb-12"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Radial light overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.08),transparent_50%)]" />

      {/* Floating Question Marks */}
      {qMarks.map((q, i) => (
        <FloatingQuestionMark
          key={i}
          style={{
            left: q.left,
            top: q.top,
            transform: `rotate(${q.rotate})`,
          }}
        />
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <CircleHelp className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Knowledge Base</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our historical artifacts
            collection, authentication processes, and research capabilities.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 
                ${
                  index === 0
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-600/30"
                    : "bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:text-white"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* FAQs placeholder (can be extended with collapsible questions) */}
        <motion.div
          className="max-w-4xl mx-auto text-gray-400 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
  className="max-w-4xl mx-auto text-gray-300 space-y-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6 }}
>
  {[
    {
      q: "How can I verify the authenticity of a historical artifact?",
      a: "We use expert analysis, radiocarbon dating, and provenance records to verify authenticity. Each item goes through a strict evaluation process by our certified team.",
    },
    {
      q: "Are all the artifacts in your collection original?",
      a: "Yes, all displayed artifacts are original unless otherwise specified. Replicas are clearly marked and used only for educational or display purposes.",
    },
    {
      q: "Can I request access to artifacts for research purposes?",
      a: "Yes, researchers can apply for access by submitting a formal request along with their credentials and research proposal. Access is granted on a case-by-case basis.",
    },
    {
      q: "Where do most of your artifacts come from?",
      a: "Our artifacts are sourced from archaeological excavations, donations from collectors, and partnerships with historical institutions worldwide.",
    },
    {
      q: "Is there a digital archive available for public viewing?",
      a: "Yes, we maintain a growing digital archive with high-resolution images, 3D scans, and descriptions accessible through our website’s 'Digital Collection' section.",
    },
  ].map(({ q, a }, i) => (
    <details
      key={i}
      className="group rounded-lg border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm hover:border-amber-400 transition-all duration-300"
    >
      <summary className="cursor-pointer text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
        {q}
      </summary>
      <p className="mt-2 text-gray-300 leading-relaxed">{a}</p>
    </details>
  ))}
</motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default FrequentlyAsk;
