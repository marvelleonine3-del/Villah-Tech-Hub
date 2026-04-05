import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold font-mono tracking-tighter text-foreground flex items-center gap-2 mb-2">
              <span className="text-primary">&lt;</span>
              Villah
              <span className="text-primary">/&gt;</span>
            </span>
            <p className="text-muted-foreground text-sm">
              Designing and building exceptional digital experiences.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" data-testid="link-footer-github">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" data-testid="link-footer-linkedin">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" data-testid="link-footer-twitter">
              <Twitter size={18} />
            </a>
            <a href="mailto:marvelleonine@gmail.com" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" data-testid="link-footer-email">
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground font-mono">
          <p>&copy; {new Date().getFullYear()} Villah Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}