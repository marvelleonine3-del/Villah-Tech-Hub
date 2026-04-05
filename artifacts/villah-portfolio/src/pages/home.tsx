import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { TechUniverse } from "@/components/tech-universe";
import { Creations } from "@/components/creations";
import { ShowcaseMarquee } from "@/components/showcase-marquee";
import { AiLab } from "@/components/ai-lab";
import { Services } from "@/components/services";
import { Experience } from "@/components/experience";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="villah-theme">
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <TechUniverse />
          <Creations />
          <ShowcaseMarquee />
          <AiLab />
          <Services />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
