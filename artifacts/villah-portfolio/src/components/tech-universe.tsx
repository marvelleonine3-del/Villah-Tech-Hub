import { motion } from "framer-motion";
import {
  SiTypescript, SiReact, SiNodedotjs, SiPython, SiDocker, SiKubernetes,
  SiNextdotjs, SiPostgresql, SiRust, SiGo, SiTensorflow, SiPytorch,
  SiGraphql, SiRedis, SiMongodb, SiGit, SiLinux, SiWebgl,
} from "react-icons/si";

const techStack = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 98 },
  { name: "React", icon: SiReact, color: "#61DAFB", level: 97 },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 95 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 94 },
  { name: "Python", icon: SiPython, color: "#3776AB", level: 90 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 88 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", level: 92 },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", level: 82 },
  { name: "Rust", icon: SiRust, color: "#CE422B", level: 72 },
  { name: "Go", icon: SiGo, color: "#00ADD8", level: 75 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", level: 80 },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", level: 85 },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", level: 88 },
  { name: "Redis", icon: SiRedis, color: "#DC382D", level: 85 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 83 },
  { name: "Git", icon: SiGit, color: "#F05032", level: 97 },
  { name: "Linux", icon: SiLinux, color: "#FCC624", level: 90 },
  { name: "WebGL", icon: SiWebgl, color: "#990000", level: 70 },
];

export function TechUniverse() {
  return (
    <section id="skills" className="py-24 bg-card/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,255,255,0.05),transparent)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Full-spectrum mastery</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">The Tech Universe</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            18+ technologies mastered across frontend, backend, cloud, AI/ML, databases, and systems programming.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -8, scale: 1.08 }}
                className="group relative"
                data-testid={`card-tech-${tech.name.toLowerCase()}`}
              >
                <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-3 overflow-hidden relative">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)` }}
                  />
                  <Icon
                    size={32}
                    className="text-muted-foreground group-hover:scale-110 transition-all duration-300"
                    style={{ color: tech.color }}
                  />
                  <span className="text-xs font-mono text-center text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                  <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.04 + 0.2, ease: "easeOut" }}
                      className="h-full rounded-full origin-left"
                      style={{
                        width: `${tech.level}%`,
                        background: `linear-gradient(90deg, ${tech.color}, ${tech.color}88)`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
