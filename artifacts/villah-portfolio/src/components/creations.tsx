import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Smartphone, Globe, Brain, Gamepad2, Puzzle, Zap, Code2, Package } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Category = "All" | "Web App" | "Mobile App" | "AI Model" | "SaaS" | "Game" | "API & Tools" | "Open Source";

const categories: { label: Category; icon: React.ElementType }[] = [
  { label: "All", icon: Code2 },
  { label: "Web App", icon: Globe },
  { label: "Mobile App", icon: Smartphone },
  { label: "AI Model", icon: Brain },
  { label: "SaaS", icon: Zap },
  { label: "Game", icon: Gamepad2 },
  { label: "API & Tools", icon: Puzzle },
  { label: "Open Source", icon: Package },
];

const creations = [
  {
    id: "aura-finance",
    title: "Aura Finance",
    category: "Web App" as Category,
    description: "Real-time fintech dashboard with live stock data, portfolio management, and AI-powered market predictions.",
    fullDescription: "Aura Finance is a high-performance React application backed by Node.js and PostgreSQL. Features real-time WebSocket connections for live stock pricing, complex D3.js visualizations, and a beautifully crafted dark-mode UI handling 10k+ concurrent users.",
    tags: ["React", "TypeScript", "Node.js", "WebSockets", "D3.js"],
    gradient: "from-emerald-400 to-cyan-500",
    icon: "💹",
    link: "#", github: "#",
  },
  {
    id: "neuralflow",
    title: "NeuralFlow",
    category: "AI Model" as Category,
    description: "Visual ML operations platform for training, deploying, and monitoring neural networks with a drag-and-drop canvas.",
    fullDescription: "Built for data scientists who prefer a visual node-based editor for assembling ML pipelines. Uses React Flow for the canvas, communicating with a Python/FastAPI backend that orchestrates Docker containers for model training on AWS EC2.",
    tags: ["React Flow", "Python", "FastAPI", "Docker", "AWS"],
    gradient: "from-violet-500 to-purple-600",
    icon: "🧠",
    link: "#", github: "#",
  },
  {
    id: "pulse-fitness",
    title: "Pulse Fitness",
    category: "Mobile App" as Category,
    description: "Cross-platform fitness app with biometric analysis, custom AI coaching plans, and HealthKit integration.",
    fullDescription: "Developed using React Native and Expo, Pulse integrates with Apple HealthKit and Google Fit APIs to aggregate biometric data. Features a custom animation engine for progress rings and offline-first architecture using SQLite.",
    tags: ["React Native", "Expo", "SQLite", "HealthKit", "TensorFlow Lite"],
    gradient: "from-orange-400 to-rose-500",
    icon: "🏃",
    link: "#", github: "#",
  },
  {
    id: "cloudsight",
    title: "CloudSight",
    category: "SaaS" as Category,
    description: "Centralized observability dashboard for distributed microservices — logs, metrics, and traces in one place.",
    fullDescription: "An internal-to-SaaS tool built to aggregate logs, metrics, and traces from Kubernetes clusters. The UI presents complex topology maps and alert thresholds. Built with Next.js, integrates directly with Prometheus and Grafana APIs.",
    tags: ["Next.js", "Kubernetes", "Prometheus", "Go", "Grafana"],
    gradient: "from-blue-400 to-indigo-600",
    icon: "☁️",
    link: "#", github: "#",
  },
  {
    id: "lumina",
    title: "Lumina Storefront",
    category: "Web App" as Category,
    description: "Headless e-commerce storefront achieving 100/100 Lighthouse with blazing-fast edge caching and minimal JS.",
    fullDescription: "A fully custom storefront built on top of Shopify's Storefront API. Achieves 100/100 Lighthouse scores through aggressive edge caching, optimized image loading, and minimal client-side JavaScript. Ships with beautiful motion design.",
    tags: ["Next.js", "Shopify API", "TailwindCSS", "Framer Motion", "Edge"],
    gradient: "from-amber-400 to-orange-500",
    icon: "🛍️",
    link: "#", github: "#",
  },
  {
    id: "nexus-gateway",
    title: "Nexus Gateway",
    category: "API & Tools" as Category,
    description: "High-throughput API gateway written in Rust with automated interactive documentation generation.",
    fullDescription: "Written in Rust for maximum performance, this gateway handles rate limiting, authentication, and request routing. The companion developer portal is a React SPA that automatically generates interactive documentation from OpenAPI specs.",
    tags: ["Rust", "React", "OpenAPI", "Redis", "PostgreSQL"],
    gradient: "from-slate-400 to-zinc-600",
    icon: "⚡",
    link: "#", github: "#",
  },
  {
    id: "echomind",
    title: "EchoMind",
    category: "AI Model" as Category,
    description: "Conversational AI chatbot built on a custom fine-tuned LLM with persistent memory and multi-modal inputs.",
    fullDescription: "EchoMind fine-tunes a Mistral 7B base model on domain-specific data using QLoRA. Features a custom RAG pipeline backed by Pinecone vector DB, persistent conversation memory, image understanding via CLIP, and a beautiful streaming chat UI.",
    tags: ["Python", "Mistral 7B", "QLoRA", "Pinecone", "LangChain"],
    gradient: "from-fuchsia-500 to-pink-600",
    icon: "🤖",
    link: "#", github: "#",
  },
  {
    id: "voidrunner",
    title: "VoidRunner",
    category: "Game" as Category,
    description: "Browser-based 3D infinite runner game with procedural generation, physics, and global leaderboards.",
    fullDescription: "A Three.js-powered browser game with procedurally generated levels, custom physics engine, particle systems for explosions, and real-time global leaderboards backed by a WebSocket server. Runs at 60fps with zero dependencies beyond Three.js.",
    tags: ["Three.js", "WebGL", "Matter.js", "Node.js", "Redis"],
    gradient: "from-red-500 to-rose-600",
    icon: "🎮",
    link: "#", github: "#",
  },
  {
    id: "codeweave",
    title: "CodeWeave",
    category: "SaaS" as Category,
    description: "AI-powered code review and refactoring SaaS tool that integrates directly with GitHub pull requests.",
    fullDescription: "CodeWeave hooks into GitHub Actions to run on every PR. Uses GPT-4 to provide inline code suggestions, detect security vulnerabilities, and auto-generate documentation. Includes a beautiful dashboard for tracking code quality over time.",
    tags: ["Next.js", "OpenAI GPT-4", "GitHub API", "TypeScript", "Stripe"],
    gradient: "from-teal-400 to-cyan-600",
    icon: "🧵",
    link: "#", github: "#",
  },
  {
    id: "voicesync",
    title: "VoiceSync",
    category: "Mobile App" as Category,
    description: "Real-time voice translation app supporting 50+ languages with offline mode and ambient noise cancellation.",
    fullDescription: "Built with React Native and Expo, VoiceSync uses Whisper AI for transcription and DeepL for translation. Features custom noise cancellation DSP algorithms, peer-to-peer WebRTC streaming for low latency, and works fully offline for 20 languages.",
    tags: ["React Native", "Whisper AI", "WebRTC", "DeepL API", "Rust"],
    gradient: "from-sky-400 to-blue-600",
    icon: "🎙️",
    link: "#", github: "#",
  },
  {
    id: "sentinelai",
    title: "Sentinel AI",
    category: "AI Model" as Category,
    description: "Computer vision model for real-time anomaly detection in industrial manufacturing with edge deployment.",
    fullDescription: "A custom-trained YOLO v8 model fine-tuned on industrial defect datasets. Deployed on edge hardware (NVIDIA Jetson) for real-time inference at 120fps. Includes a dashboard for monitoring detection accuracy, false positive rates, and production line health.",
    tags: ["PyTorch", "YOLO v8", "NVIDIA Jetson", "FastAPI", "OpenCV"],
    gradient: "from-lime-400 to-green-600",
    icon: "👁️",
    link: "#", github: "#",
  },
  {
    id: "openflow",
    title: "OpenFlow",
    category: "Open Source" as Category,
    description: "Open-source React state management library with zero boilerplate, 5kb gzipped, and full TypeScript support.",
    fullDescription: "OpenFlow is a tiny, predictable state management library for React. It uses a proxy-based reactivity system (like Vue's), atomic updates, and derives computed state automatically. Zero config, zero boilerplate, and first-class TypeScript generics. 2.4k GitHub stars.",
    tags: ["TypeScript", "React", "Proxy API", "Jest", "Rollup"],
    gradient: "from-yellow-400 to-amber-500",
    icon: "🌊",
    link: "#", github: "#",
  },
  {
    id: "pixelforge",
    title: "PixelForge",
    category: "Web App" as Category,
    description: "Browser-based pixel art and sprite animation editor with timeline editor and spritesheet export.",
    fullDescription: "A feature-complete pixel art editor built with pure Canvas API — no WebGL. Supports layers, onion skinning, frame-by-frame animation, palette management, and exports to GIF, PNG spritesheet, and APNG. Used by indie game devs worldwide.",
    tags: ["Canvas API", "TypeScript", "WASM", "React", "IndexedDB"],
    gradient: "from-pink-400 to-rose-500",
    icon: "🎨",
    link: "#", github: "#",
  },
  {
    id: "routemaster",
    title: "RouteMaster",
    category: "API & Tools" as Category,
    description: "CLI tool for scaffolding backend APIs in any language with interactive prompts and plugin ecosystem.",
    fullDescription: "RouteMaster is a developer tool that scaffolds production-ready backend APIs in Node.js, Python, Go, or Rust. Interactive CLI prompts guide you through authentication strategy, database choice, and deployment target. 500+ downloads per week on npm.",
    tags: ["Node.js", "TypeScript", "CLI", "Plop.js", "Handlebars"],
    gradient: "from-indigo-400 to-violet-600",
    icon: "🛣️",
    link: "#", github: "#",
  },
  {
    id: "docugenius",
    title: "DocuGenius",
    category: "SaaS" as Category,
    description: "AI-powered document intelligence platform — upload any PDF and have a conversation with its content.",
    fullDescription: "DocuGenius ingests PDFs, Word docs, and spreadsheets into a RAG pipeline backed by Chroma. Users can ask natural language questions, get cited answers, summarize sections, and translate documents to any language. Processes documents in under 5 seconds.",
    tags: ["Python", "LangChain", "Chroma", "FastAPI", "Next.js"],
    gradient: "from-cyan-400 to-sky-600",
    icon: "📄",
    link: "#", github: "#",
  },
  {
    id: "quantumchess",
    title: "Quantum Chess",
    category: "Game" as Category,
    description: "A chess variant where pieces exist in quantum superposition — move a piece and it splits into two possibilities.",
    fullDescription: "Quantum Chess implements the actual quantum superposition rule from the classic thought experiment. The board state is represented as a quantum register, moves are unitary transformations, and measurements collapse superpositions. Built entirely in TypeScript with a custom game engine.",
    tags: ["TypeScript", "React", "WebAssembly", "Node.js", "Socket.IO"],
    gradient: "from-violet-400 to-fuchsia-600",
    icon: "♟️",
    link: "#", github: "#",
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function Creations() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<typeof creations[0] | null>(null);

  const filtered = activeCategory === "All"
    ? creations
    : creations.filter((c) => c.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-1/4 w-[50vw] h-[50vw] bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 -left-1/4 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Everything built</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">The Creation Vault</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl">
            16+ flagship creations across every domain of tech — web, mobile, AI, games, SaaS, and open source.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              data-testid={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono border transition-all duration-300 ${
                activeCategory === label
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TiltCard className="h-full">
                  <div
                    className="relative h-full bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedProject(item)}
                    data-testid={`card-creation-${item.id}`}
                  >
                    {/* Gradient Top Banner */}
                    <div className={`h-32 w-full bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(6)].map((_, k) => (
                          <div
                            key={k}
                            className="absolute rounded-full bg-white"
                            style={{
                              width: `${20 + k * 15}px`,
                              height: `${20 + k * 15}px`,
                              left: `${10 + k * 16}%`,
                              top: `${20 + (k % 3) * 20}%`,
                              opacity: 0.1 + k * 0.05,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-4xl relative z-10" role="img" aria-label={item.title}>
                        {item.icon}
                      </span>
                      <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/80 to-transparent`} />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full bg-gradient-to-r ${item.gradient} text-white`}>
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-muted/50 border border-border/50 px-2 py-0.5 rounded font-mono">
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground font-mono">+{item.tags.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-all duration-300 pointer-events-none" />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-card border-border overflow-hidden p-0">
          <DialogTitle className="sr-only">Project Details</DialogTitle>
          {selectedProject && (
            <div className="flex flex-col max-h-[85vh] overflow-y-auto">
              <div className={`h-48 w-full bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center relative`}>
                <span className="text-7xl">{selectedProject.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
              </div>
              <div className="p-8">
                <span className={`text-xs font-mono px-3 py-1 rounded-full bg-gradient-to-r ${selectedProject.gradient} text-white`}>
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl font-bold mt-4 mb-4">{selectedProject.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{selectedProject.fullDescription}</p>
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-sm bg-muted px-3 py-1 rounded-md border border-border font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <a href={selectedProject.link} className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    Live Demo <ExternalLink size={16} />
                  </a>
                  <a href={selectedProject.github} className="flex-1 border border-border py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                    Source Code <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
