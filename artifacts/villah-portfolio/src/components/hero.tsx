import { motion, useAnimationFrame } from "framer-motion";
import { ArrowRight, Terminal, Github, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const TITLES = ["Full-Stack Engineer", "AI/ML Builder", "Mobile Developer", "DevOps Architect", "Open Source Creator"];

function TypewriterTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    pulse: number;
  };

  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initParticles = () => {
      const count = Math.min(60, Math.floor(canvas.offsetWidth * canvas.offsetHeight / 12000));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const onResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useAnimationFrame((t) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x: mx, y: my } = mouseRef.current;
    const particles = particlesRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.pulse += 0.02;
      const pulsedOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.vx -= (dx / dist) * 0.04;
        p.vy -= (dy / dist) * 0.04;
      }

      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${pulsedOpacity})`;
      ctx.fill();
    });

    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach((b) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - dist / 100) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
  });

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Particle canvas */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-primary rounded-full blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.04, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-blue-500 rounded-full blur-[130px]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{ maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 10%, transparent 100%)" }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-mono mb-8"
          >
            <Terminal size={14} />
            <span>Available for hire — Let's build something great</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-2 h-2 bg-emerald-400 rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-2">
              Villah
            </h1>
            <div className="text-2xl md:text-4xl font-bold h-12 flex items-center justify-center">
              <TypewriterTitle />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light leading-relaxed"
          >
            A versatile tech professional who ships apps, builds AI models, architects cloud systems, 
            and crafts stunning web experiences — all under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(0,255,255,0.5)]"
              data-testid="button-view-work"
            >
              View The Vault <ArrowRight size={18} />
            </a>
            <a
              href="https://wa.me/2349024823087"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border text-foreground rounded-md font-semibold flex items-center justify-center hover:bg-muted transition-all hover:border-primary/50"
              data-testid="button-contact-whatsapp"
            >
              Hire Villah
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 text-muted-foreground"
          >
            <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 inline-block" data-testid="link-social-github">
              <Github size={22} />
            </a>
            <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 inline-block" data-testid="link-social-linkedin">
              <Linkedin size={22} />
            </a>
            <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 inline-block" data-testid="link-social-twitter">
              <Twitter size={22} />
            </a>
            <div className="w-px h-6 bg-border" />
            <a href="mailto:marvelleonine@gmail.com" className="text-sm font-mono hover:text-primary transition-colors" data-testid="link-hero-email">
              marvelleonine@gmail.com
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
