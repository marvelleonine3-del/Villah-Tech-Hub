import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Cpu, Network, Sparkles, Zap, Eye, MessageSquare, Mic } from "lucide-react";

const models = [
  {
    id: "echomind",
    name: "EchoMind LLM",
    type: "Large Language Model",
    description: "Fine-tuned Mistral 7B on domain-specific data using QLoRA. Persistent memory, RAG pipeline with Pinecone, multi-modal with CLIP.",
    icon: MessageSquare,
    stats: { params: "7B", accuracy: "94.2%", latency: "~180ms" },
    color: "from-violet-500 to-fuchsia-600",
    status: "Production",
  },
  {
    id: "sentinel",
    name: "Sentinel CV",
    type: "Computer Vision",
    description: "Custom YOLO v8 model for real-time industrial anomaly detection at 120fps on NVIDIA Jetson edge hardware.",
    icon: Eye,
    stats: { params: "68M", accuracy: "98.7%", latency: "8ms" },
    color: "from-emerald-500 to-teal-600",
    status: "Production",
  },
  {
    id: "voicenet",
    name: "VoiceNet",
    type: "Speech Recognition",
    description: "Whisper-based multilingual speech model with custom noise-cancellation DSP. Supports 50+ languages, works fully offline.",
    icon: Mic,
    stats: { params: "244M", accuracy: "96.1%", latency: "~90ms" },
    color: "from-sky-500 to-blue-600",
    status: "Beta",
  },
  {
    id: "codegenie",
    name: "CodeGenie",
    type: "Code Generation",
    description: "Specialized code assistant fine-tuned on 10M+ code snippets. Understands context, suggests refactors, and catches bugs.",
    icon: Brain,
    stats: { params: "13B", accuracy: "91.5%", latency: "~220ms" },
    color: "from-orange-500 to-amber-600",
    status: "Production",
  },
  {
    id: "recsys",
    name: "RecommendAI",
    type: "Recommendation Engine",
    description: "Graph neural network-based recommendation engine. Learns user preferences from implicit signals with cold-start handling.",
    icon: Network,
    stats: { params: "340M", accuracy: "89.3%", latency: "~12ms" },
    color: "from-rose-500 to-pink-600",
    status: "Production",
  },
  {
    id: "synthgen",
    name: "SynthGen",
    type: "Generative AI",
    description: "Diffusion model for generating synthetic training data for rare edge cases in autonomous driving datasets.",
    icon: Sparkles,
    stats: { params: "890M", accuracy: "FID: 4.2", latency: "~2s" },
    color: "from-cyan-500 to-blue-600",
    status: "Research",
  },
];

function NeuralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useAnimationFrame((t) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodes = [
      { x: 0.15, y: 0.5 },
      { x: 0.35, y: 0.25 }, { x: 0.35, y: 0.5 }, { x: 0.35, y: 0.75 },
      { x: 0.55, y: 0.15 }, { x: 0.55, y: 0.38 }, { x: 0.55, y: 0.62 }, { x: 0.55, y: 0.85 },
      { x: 0.75, y: 0.3 }, { x: 0.75, y: 0.7 },
      { x: 0.9, y: 0.5 },
    ].map(n => ({ x: n.x * canvas.width, y: n.y * canvas.height }));

    const edges = [
      [0,1],[0,2],[0,3],
      [1,4],[1,5],[2,4],[2,5],[2,6],[3,5],[3,6],[3,7],
      [4,8],[5,8],[5,9],[6,8],[6,9],[7,9],
      [8,10],[9,10],
    ];

    edges.forEach(([a, b]) => {
      const pulse = (Math.sin(t * 0.002 + a * 0.7) + 1) / 2;
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + pulse * 0.3})`;
      ctx.lineWidth = 1 + pulse;
      ctx.stroke();
    });

    nodes.forEach((node, i) => {
      const pulse = (Math.sin(t * 0.002 + i * 0.9) + 1) / 2;
      const radius = 4 + pulse * 3;
      const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
      grd.addColorStop(0, `rgba(0,255,255,${0.8 + pulse * 0.2})`);
      grd.addColorStop(1, "rgba(0,255,255,0)");
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    });

    frameRef.current++;
  });

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export function AiLab() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="ai-lab" className="py-24 relative overflow-hidden bg-card/20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu size={20} className="text-primary" />
              <span className="font-mono text-primary text-sm tracking-widest uppercase">AI Laboratory</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Machines That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Think</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Beyond writing code, Villah trains and deploys custom AI models — from large language models to computer vision systems running on edge hardware. Each model is purpose-built for production impact.
            </p>
            <div className="flex gap-6 font-mono text-sm">
              <div>
                <p className="text-3xl font-bold text-primary">6+</p>
                <p className="text-muted-foreground">Models deployed</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">2B+</p>
                <p className="text-muted-foreground">Parameters trained</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">99.9%</p>
                <p className="text-muted-foreground">Uptime SLA</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-64 rounded-2xl border border-border bg-background/50 overflow-hidden relative"
          >
            <NeuralAnimation />
            <div className="absolute bottom-4 left-4 font-mono text-xs text-primary/60">
              Neural network — live visualization
            </div>
          </motion.div>
        </div>

        {/* Model Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {models.map((model, i) => {
            const Icon = model.icon;
            const isHovered = hovered === model.id;

            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(model.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden group cursor-default"
                data-testid={`card-ai-model-${model.id}`}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center text-white`}>
                    <Icon size={22} />
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded-full border ${
                    model.status === "Production"
                      ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                      : model.status === "Beta"
                      ? "border-amber-500/50 text-amber-400 bg-amber-500/10"
                      : "border-violet-500/50 text-violet-400 bg-violet-500/10"
                  }`}>
                    {model.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1">{model.name}</h3>
                <p className="text-xs font-mono text-primary mb-3">{model.type}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{model.description}</p>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                  {Object.entries(model.stats).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm font-bold font-mono">{val}</p>
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
