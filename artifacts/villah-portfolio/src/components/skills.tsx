import { motion } from "framer-motion";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiDocker, 
  SiKubernetes, 
  SiNextdotjs,
  SiPostgresql
} from "react-icons/si";

const skillData = [
  { subject: "Frontend", A: 95, fullMark: 100 },
  { subject: "Backend", A: 90, fullMark: 100 },
  { subject: "DevOps", A: 85, fullMark: 100 },
  { subject: "Cloud/AWS", A: 80, fullMark: 100 },
  { subject: "AI/ML", A: 75, fullMark: 100 },
  { subject: "UI/UX", A: 85, fullMark: 100 },
];

const technologies = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Tech Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-6 rounded-xl bg-background border border-border flex flex-col items-center justify-center gap-4 group"
                data-testid={`card-tech-${tech.name.toLowerCase()}`}
              >
                <tech.icon 
                  size={40} 
                  className="text-muted-foreground group-hover:text-[var(--hover-color)] transition-colors duration-300"
                  style={{ "--hover-color": tech.color } as React.CSSProperties}
                />
                <span className="text-sm font-mono font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-[400px] w-full rounded-2xl bg-background border border-border p-4 flex items-center justify-center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "var(--app-font-mono)" }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                  itemStyle={{ color: "hsl(var(--primary))" }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}