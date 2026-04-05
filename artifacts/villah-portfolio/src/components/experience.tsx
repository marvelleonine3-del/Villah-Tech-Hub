import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Senior Full Stack Engineer",
    company: "Nexus Technologies",
    period: "2022 - Present",
    description: "Led the development of a real-time collaborative workspace tool. Architected the WebSocket infrastructure handling 50k+ concurrent connections. Mentored a team of 4 junior developers.",
  },
  {
    id: 2,
    role: "DevOps & Backend Engineer",
    company: "CloudScale Inc.",
    period: "2020 - 2022",
    description: "Migrated legacy monolithic applications to a containerized microservices architecture on AWS EKS. Reduced deployment times by 70% by implementing robust CI/CD pipelines via GitHub Actions.",
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Creative Digital",
    period: "2018 - 2020",
    description: "Built highly interactive marketing websites and e-commerce storefronts using React and Three.js. Won two Awwwards for exceptional UI/UX implementation.",
  },
  {
    id: 4,
    role: "Software Engineering Intern",
    company: "TechNova",
    period: "2017 - 2018",
    description: "Developed internal dashboard tools using Vue.js and Express. Automated reporting workflows saving the operations team 15 hours per week.",
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Journey</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 mt-1.5 md:mt-0 ring-4 ring-background" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"}`}>
                  <div className="bg-card border border-border p-6 rounded-2xl hover:border-primary/30 transition-colors">
                    <span className="text-primary font-mono text-sm block mb-2">{exp.period}</span>
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <h4 className="text-muted-foreground font-medium mb-4">{exp.company}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}