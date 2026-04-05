import { motion } from "framer-motion";

const websites = [
  { name: "FinancePro Dashboard", type: "SaaS Web App" },
  { name: "ArtFlow NFT Marketplace", type: "Web3 Platform" },
  { name: "MedTrack Patient Portal", type: "Healthcare App" },
  { name: "ShopSphere E-Commerce", type: "Online Store" },
  { name: "EduLearn LMS Platform", type: "EdTech SaaS" },
  { name: "RealEstate360", type: "Property Platform" },
  { name: "FoodieMap Restaurant Guide", type: "Discovery App" },
  { name: "TravelMate Trip Planner", type: "Travel App" },
  { name: "CryptoWatch Analytics", type: "Crypto Dashboard" },
  { name: "CodeCollab IDE", type: "Developer Tool" },
  { name: "GreenTrack Carbon Monitor", type: "Climate Tech" },
  { name: "VenueBook Event Manager", type: "B2B SaaS" },
  { name: "LegalDocs AI", type: "LegalTech" },
  { name: "HireAI Recruitment", type: "HR Tech" },
  { name: "NewsFlow Aggregator", type: "Media Platform" },
  { name: "FitCoach AI", type: "Health & Fitness" },
];

const mobileApps = [
  { name: "Mindful Meditation", type: "Wellness App" },
  { name: "Budget Buddy Finance", type: "Personal Finance" },
  { name: "Grocery Magic", type: "Lifestyle" },
  { name: "Night Sky AR", type: "Augmented Reality" },
  { name: "SignLang Translator", type: "Accessibility" },
  { name: "PetHealth Tracker", type: "Pet Care" },
  { name: "LocalMart Delivery", type: "On-Demand" },
  { name: "MusicMind Practice", type: "Music Education" },
  { name: "HabitStack", type: "Productivity" },
  { name: "SkillMatch Jobs", type: "Career" },
  { name: "FlashCard AI", type: "Education" },
  { name: "SleepLab Monitor", type: "Health Tech" },
  { name: "Calorie AI Scanner", type: "Nutrition" },
  { name: "Wayfinder Navigation", type: "Maps & Travel" },
  { name: "VaultKey Password", type: "Security" },
  { name: "BrewMaster Beer Log", type: "Hobby" },
];

function MarqueeRow({ items, direction = 1, speed = 30 }: { items: typeof websites; direction?: number; speed?: number }) {
  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex gap-4 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 bg-card border border-border rounded-full px-5 py-2.5 group hover:border-primary/50 transition-colors duration-300"
          >
            <div className="w-2 h-2 rounded-full bg-primary group-hover:animate-pulse" />
            <span className="font-medium text-sm text-foreground">{item.name}</span>
            <span className="text-xs font-mono text-muted-foreground">{item.type}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ShowcaseMarquee() {
  return (
    <section className="py-20 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase">A glimpse of 120+ shipped</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-3">Things Built For The World</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A non-exhaustive scroll through websites, apps, and platforms shipped across every industry.
          </p>
        </motion.div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={websites} direction={1} speed={35} />
        <MarqueeRow items={mobileApps} direction={-1} speed={28} />
        <MarqueeRow items={[...websites].reverse()} direction={1} speed={40} />
      </div>
    </section>
  );
}
