import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Villah completely transformed our infrastructure. We were struggling with database lockups during traffic spikes, and within a month, the system was bulletproof. A rare talent who understands both the big picture and the minute details.",
    author: "Sarah Jenkins",
    role: "CTO, FinTech Innovators"
  },
  {
    quote: "The attention to detail in the frontend implementation was staggering. Not only did the application look exactly like the designs, but the fluid animations and performance optimizations made it feel incredibly premium.",
    author: "David Chen",
    role: "Product Manager, Creative Flow"
  },
  {
    quote: "We needed a complex ML pipeline integrated into our existing React application. Villah bridged the gap between our data scientists and our web team flawlessly. The resulting tool is now the core of our business.",
    author: "Elena Rodriguez",
    role: "Founder, DataSight AI"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-primary/5 relative border-y border-primary/10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Client Feedback</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-card border border-border p-8 rounded-2xl flex flex-col"
            >
              <Quote className="text-primary/40 mb-6" size={40} />
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-foreground">{t.author}</p>
                <p className="text-sm text-primary font-mono">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}