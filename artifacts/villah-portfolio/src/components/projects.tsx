import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    id: "fintech",
    title: "Aura Finance",
    category: "Web Application",
    description: "A comprehensive fintech dashboard for tracking investments, analyzing market trends, and managing portfolios with real-time data streaming.",
    fullDescription: "Aura Finance is a high-performance React application backed by Node.js and PostgreSQL. It features real-time WebSocket connections for live stock pricing, complex data visualization using D3.js, and a beautifully crafted dark-mode UI. The system handles thousands of concurrent users with sub-50ms latency.",
    image: "/images/project-fintech.png",
    tags: ["React", "TypeScript", "Node.js", "WebSockets"],
    link: "#",
    github: "#"
  },
  {
    id: "ai-platform",
    title: "NeuralFlow",
    category: "AI Platform",
    description: "Machine learning operations platform for training, deploying, and monitoring neural networks visually.",
    fullDescription: "Built for data scientists who prefer a visual node-based editor for assembling ML pipelines. The frontend uses React Flow for the canvas, communicating with a Python/FastAPI backend that orchestrates Docker containers for model training jobs on AWS EC2 instances.",
    image: "/images/project-ai.png",
    tags: ["React Flow", "Python", "Docker", "AWS"],
    link: "#",
    github: "#"
  },
  {
    id: "mobile-app",
    title: "Pulse Fitness",
    category: "Mobile App",
    description: "Cross-platform mobile application for personalized workout tracking and biometric analysis.",
    fullDescription: "Developed using React Native and Expo, Pulse integrates with Apple HealthKit and Google Fit APIs to aggregate biometric data. Features a custom animation engine for the progress rings and offline-first architecture using SQLite.",
    image: "/images/project-mobile.png",
    tags: ["React Native", "Expo", "SQLite", "HealthKit"],
    link: "#",
    github: "#"
  },
  {
    id: "devops",
    title: "CloudSight",
    category: "DevOps & Infrastructure",
    description: "Centralized monitoring and observability dashboard for distributed microservices architectures.",
    fullDescription: "An internal tool built to aggregate logs, metrics, and traces from Kubernetes clusters. The UI presents complex topology maps and alert thresholds. Built with Next.js and integrates directly with Prometheus and Grafana APIs.",
    image: "/images/project-devops.png",
    tags: ["Next.js", "Kubernetes", "Prometheus", "Go"],
    link: "#",
    github: "#"
  },
  {
    id: "ecommerce",
    title: "Lumina Storefront",
    category: "E-Commerce",
    description: "Headless e-commerce storefront focusing on extreme performance and premium aesthetic.",
    fullDescription: "A fully custom storefront built on top of Shopify's Storefront API. Achieves 100/100 Lighthouse scores across the board through aggressive edge caching, optimized image loading, and minimal client-side JavaScript.",
    image: "/images/project-ecommerce.png",
    tags: ["Next.js", "Shopify API", "TailwindCSS", "Framer Motion"],
    link: "#",
    github: "#"
  },
  {
    id: "api",
    title: "Nexus Gateway",
    category: "Developer Tool",
    description: "High-throughput API gateway and developer portal with automated documentation generation.",
    fullDescription: "Written in Rust for maximum performance, this gateway handles rate limiting, authentication, and request routing. The companion developer portal is a React SPA that automatically generates interactive documentation from OpenAPI specs.",
    image: "/images/project-api.png",
    tags: ["Rust", "React", "OpenAPI", "Redis"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl text-lg">
              A selection of my best work covering full-stack apps, mobile experiences, and complex infrastructure.
            </p>
          </div>
          <a href="#" className="text-primary hover:text-cyan-400 font-mono flex items-center gap-2 transition-colors">
            View All Repositories <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-card border border-border cursor-pointer h-[400px]"
              onClick={() => setSelectedProject(project)}
              data-testid={`card-project-${project.id}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/80 md:bg-background/90 group-hover:bg-background/60 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-primary font-mono text-sm mb-2">{project.category}</span>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground line-clamp-2 mb-4 group-hover:text-foreground/80 transition-colors">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-muted/50 backdrop-blur-sm border border-border/50 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
          <DialogTitle className="sr-only">Project Details</DialogTitle>
          {selectedProject && (
            <div className="flex flex-col md:flex-row h-full max-h-[80vh] overflow-y-auto">
              <div className="w-full md:w-1/2 relative bg-muted">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col">
                <span className="text-primary font-mono text-sm mb-2">{selectedProject.category}</span>
                <h3 className="text-3xl font-bold mb-6">{selectedProject.title}</h3>
                
                <div className="prose prose-invert max-w-none mb-8 text-muted-foreground">
                  <p>{selectedProject.fullDescription}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-foreground">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-sm bg-muted px-3 py-1 rounded-md border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-4">
                  <a 
                    href={selectedProject.link} 
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    Live Demo <ExternalLink size={18} />
                  </a>
                  <a 
                    href={selectedProject.github} 
                    className="flex-1 bg-transparent border border-border py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                  >
                    Source Code <Github size={18} />
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