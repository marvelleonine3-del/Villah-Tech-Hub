import { motion } from "framer-motion";
import { MonitorSmartphone, Database, Brain, Server, Layout, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Full-Stack Development",
    description: "End-to-end web and mobile applications built with modern frameworks. React, React Native, Next.js, and highly interactive interfaces."
  },
  {
    icon: Database,
    title: "Backend & API Design",
    description: "Robust, scalable, and secure backend architectures. RESTful and GraphQL APIs built with Node.js, Python, or Rust, backed by optimized databases."
  },
  {
    icon: Brain,
    title: "AI/ML Integration",
    description: "Connecting applications to large language models, setting up custom RAG pipelines, and implementing intelligent automation features."
  },
  {
    icon: Server,
    title: "Cloud Infrastructure",
    description: "Designing and deploying resilient architectures on AWS or GCP. Containerization with Docker, orchestration with Kubernetes, and CI/CD pipelines."
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "Translating complex requirements into intuitive, beautiful, and accessible user interfaces. Wireframing, prototyping, and design systems."
  },
  {
    icon: ShieldCheck,
    title: "System Architecture",
    description: "High-level technical planning for complex systems. Ensuring scalability, security, performance, and long-term maintainability."
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-card/30 relative border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What I Do</h2>
          <p className="text-muted-foreground text-lg">
            I don't just write code; I solve problems. Whether you need a polished frontend, a resilient backend, or a complete system architecture, I deliver production-ready solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}