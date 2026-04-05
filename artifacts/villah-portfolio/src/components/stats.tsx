import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Projects Shipped", color: "from-cyan-400 to-blue-500" },
  { value: 80, suffix: "+", label: "Websites Built", color: "from-violet-400 to-purple-600" },
  { value: 35, suffix: "+", label: "AI Integrations", color: "from-emerald-400 to-teal-500" },
  { value: 6, suffix: "+", label: "Years Experience", color: "from-orange-400 to-rose-500" },
  { value: 50, suffix: "+", label: "Happy Clients", color: "from-pink-400 to-fuchsia-600" },
  { value: 99, suffix: "%", label: "Client Satisfaction", color: "from-yellow-400 to-amber-500" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5" />
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase">By the numbers</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">The Scale of Impact</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center gap-2 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
