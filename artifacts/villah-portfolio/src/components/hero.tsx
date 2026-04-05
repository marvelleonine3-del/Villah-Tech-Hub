import { motion } from "framer-motion";
import { ArrowRight, Terminal, Github, Linkedin, Twitter } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{ maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)' }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-mono mb-8"
          >
            <Terminal size={14} />
            <span>System.out.println("Hello, World!");</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
          >
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">future</span> <br className="hidden md:block" />
            of digital products.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light"
          >
            I'm Villah. A versatile tech professional bridging the gap between visionary ideas and production-ready systems. From full-stack web to AI integrations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,255,255,0.4)]"
              data-testid="button-view-work"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border text-foreground rounded-md font-medium flex items-center justify-center hover:bg-muted transition-all"
              data-testid="button-contact-me"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex items-center gap-6 text-muted-foreground"
          >
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-social-github"><Github size={24} /></a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-social-linkedin"><Linkedin size={24} /></a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-social-twitter"><Twitter size={24} /></a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}