import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send, MapPin, Mail, Phone, Shield, Lock, CheckCircle2,
  User, MessageSquare, Clock, BadgeCheck, Sparkles, ExternalLink,
} from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const VILLAH_EMAIL = "marvelleonine@gmail.com";
const MAX_MESSAGE = 2000;

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name is too long.")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(100, "Email is too long."),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters — give some context!")
    .max(MAX_MESSAGE, `Message cannot exceed ${MAX_MESSAGE} characters.`),
  honeypot: z.string().max(0, "Bot detected."),
});

type FormValues = z.infer<typeof formSchema>;

const trustBadges = [
  { icon: Shield, label: "Spam-free", desc: "Your message goes directly to Villah" },
  { icon: Lock, label: "Private", desc: "No data stored on any server" },
  { icon: BadgeCheck, label: "Verified", desc: "Opens your own Gmail to send" },
  { icon: Clock, label: "Fast reply", desc: "Typically responds within 24 hours" },
];

function FloatingLabel({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <motion.span
      animate={{ color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
      transition={{ duration: 0.2 }}
      className="text-sm font-medium"
    >
      {children}
    </motion.span>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [gmailUrl, setGmailUrl] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", honeypot: "" },
    mode: "onChange",
  });

  const messageValue = form.watch("message") ?? "";
  const nameValue = form.watch("name") ?? "";
  const emailValue = form.watch("email") ?? "";
  const subjectValue = form.watch("subject") ?? "";

  function onSubmit(values: FormValues) {
    if (values.honeypot) return;

    const gmailBody = [
      `Hi Villah,`,
      ``,
      values.message,
      ``,
      `---`,
      `From: ${values.name}`,
      `Reply to: ${values.email}`,
    ].join("\n");

    const url =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(VILLAH_EMAIL)}` +
      `&su=${encodeURIComponent(`[Portfolio] ${values.subject}`)}` +
      `&body=${encodeURIComponent(gmailBody)}`;

    setGmailUrl(url);

    // Programmatic anchor click — bypasses popup blockers, treated as direct user action
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setSent(true);
    form.reset();
  }

  const charPercent = Math.min((messageValue.length / MAX_MESSAGE) * 100, 100);
  const charColor = charPercent > 90 ? "#ef4444" : charPercent > 70 ? "#f59e0b" : "hsl(var(--primary))";

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[40vw] h-[30vw] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[30vw] h-[20vw] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Open to work</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">extraordinary.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fill the form and your message opens in Gmail — ready to send in one click. No middlemen, no delays.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Contact links */}
            <div className="space-y-4">
              <a
                href="mailto:marvelleonine@gmail.com"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-all group"
                data-testid="link-email"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center text-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all"
                >
                  <Mail size={20} />
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Email directly</p>
                  <p className="font-mono text-xs text-muted-foreground">marvelleonine@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/2349024823087"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-all group"
                data-testid="link-whatsapp"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center text-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all"
                >
                  <Phone size={20} />
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground text-sm">WhatsApp</p>
                  <p className="font-mono text-xs text-muted-foreground">+234 902 482 3087</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Location</p>
                  <p className="font-mono text-xs text-muted-foreground">Nigeria / Remote Worldwide</p>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-primary" />
                <p className="font-semibold text-sm">How this form works</p>
              </div>
              <ol className="space-y-3">
                {[
                  { icon: User, text: "Fill in your name, email, subject and message" },
                  { icon: CheckCircle2, text: "Click Send — your Gmail compose opens instantly" },
                  { icon: ExternalLink, text: "Review your pre-filled message and hit Send in Gmail" },
                  { icon: Clock, text: "Villah receives it and replies within 24 hours" },
                ].map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.5 }}
                    className="bg-card border border-border rounded-xl p-3 flex flex-col gap-1.5"
                  >
                    <Icon size={16} className="text-primary" />
                    <p className="text-xs font-semibold text-foreground">{badge.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">{badge.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-card border border-emerald-500/40 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[500px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"
                  >
                    <CheckCircle2 size={40} className="text-emerald-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Gmail is opening!</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Your message is pre-filled and ready to go. Just hit <strong className="text-foreground">Send</strong> inside Gmail.
                    </p>
                  </div>

                  {/* Fallback — in case the redirect was blocked */}
                  {gmailUrl && (
                    <motion.a
                      href={gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -8px rgba(0,255,255,0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                      data-testid="button-open-gmail"
                    >
                      <Mail size={16} />
                      Gmail didn't open? Click here
                      <ExternalLink size={14} className="opacity-70" />
                    </motion.a>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare size={14} className="text-primary" />
                    <span>Villah typically replies within 24 hours</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSent(false)}
                    className="text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                    data-testid="button-send-another"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden"
                >
                  {/* Animated border glow */}
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(0deg, rgba(0,255,255,0.05), transparent)",
                        "linear-gradient(180deg, rgba(0,255,255,0.05), transparent)",
                        "linear-gradient(360deg, rgba(0,255,255,0.05), transparent)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                  />

                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-muted-foreground font-mono">Opens Gmail — no middleman</span>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                      {/* Honeypot — hidden anti-bot field */}
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute opacity-0 -z-10 pointer-events-none"
                        {...form.register("honeypot")}
                      />

                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <FloatingLabel active={activeField === "name" || !!nameValue}>
                                  Your Name
                                </FloatingLabel>
                              </FormLabel>
                              <FormControl>
                                <motion.div
                                  animate={{
                                    boxShadow: activeField === "name"
                                      ? "0 0 0 2px hsl(var(--primary) / 0.3)"
                                      : "0 0 0 0px transparent",
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className="rounded-md overflow-hidden"
                                >
                                  <Input
                                    placeholder="e.g. John Doe"
                                    {...field}
                                    className="bg-background border-border focus:border-primary transition-colors"
                                    onFocus={() => setActiveField("name")}
                                    onBlur={() => setActiveField(null)}
                                    data-testid="input-name"
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <FloatingLabel active={activeField === "email" || !!emailValue}>
                                  Your Email
                                </FloatingLabel>
                              </FormLabel>
                              <FormControl>
                                <motion.div
                                  animate={{
                                    boxShadow: activeField === "email"
                                      ? "0 0 0 2px hsl(var(--primary) / 0.3)"
                                      : "0 0 0 0px transparent",
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className="rounded-md overflow-hidden"
                                >
                                  <Input
                                    placeholder="you@example.com"
                                    type="email"
                                    {...field}
                                    className="bg-background border-border focus:border-primary transition-colors"
                                    onFocus={() => setActiveField("email")}
                                    onBlur={() => setActiveField(null)}
                                    data-testid="input-email"
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <FloatingLabel active={activeField === "subject" || !!subjectValue}>
                                Subject
                              </FloatingLabel>
                            </FormLabel>
                            <FormControl>
                              <motion.div
                                animate={{
                                  boxShadow: activeField === "subject"
                                    ? "0 0 0 2px hsl(var(--primary) / 0.3)"
                                    : "0 0 0 0px transparent",
                                }}
                                transition={{ duration: 0.2 }}
                                className="rounded-md overflow-hidden"
                              >
                                <Input
                                  placeholder="e.g. I'd like to hire you for a project"
                                  {...field}
                                  className="bg-background border-border focus:border-primary transition-colors"
                                  onFocus={() => setActiveField("subject")}
                                  onBlur={() => setActiveField(null)}
                                  data-testid="input-subject"
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>
                                <FloatingLabel active={activeField === "message" || !!messageValue}>
                                  Message
                                </FloatingLabel>
                              </FormLabel>
                              <span
                                className="text-xs font-mono transition-colors"
                                style={{ color: charColor }}
                              >
                                {messageValue.length}/{MAX_MESSAGE}
                              </span>
                            </div>
                            <FormControl>
                              <motion.div
                                animate={{
                                  boxShadow: activeField === "message"
                                    ? "0 0 0 2px hsl(var(--primary) / 0.3)"
                                    : "0 0 0 0px transparent",
                                }}
                                transition={{ duration: 0.2 }}
                                className="rounded-md overflow-hidden"
                              >
                                <Textarea
                                  placeholder="Tell Villah about your project, idea, or question. The more detail, the better..."
                                  className="min-h-[180px] resize-none bg-background border-border focus:border-primary transition-colors"
                                  {...field}
                                  onFocus={() => setActiveField("message")}
                                  onBlur={() => setActiveField(null)}
                                  data-testid="input-message"
                                />
                              </motion.div>
                            </FormControl>
                            {/* Character bar */}
                            <div className="h-0.5 w-full bg-muted rounded-full overflow-hidden mt-1">
                              <motion.div
                                animate={{ width: `${charPercent}%` }}
                                transition={{ duration: 0.3 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: charColor }}
                              />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Field completeness indicator */}
                      <div className="flex items-center gap-3 py-2">
                        {[
                          { label: "Name", valid: !form.formState.errors.name && nameValue.length >= 2 },
                          { label: "Email", valid: !form.formState.errors.email && emailValue.includes("@") },
                          { label: "Subject", valid: !form.formState.errors.subject && subjectValue.length >= 3 },
                          { label: "Message", valid: !form.formState.errors.message && messageValue.length >= 20 },
                        ].map((item) => (
                          <motion.div
                            key={item.label}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-1"
                          >
                            <motion.div
                              animate={{
                                backgroundColor: item.valid ? "rgb(52,211,153)" : "hsl(var(--muted))",
                                scale: item.valid ? [1, 1.3, 1] : 1,
                              }}
                              transition={{ duration: 0.3 }}
                              className="w-2 h-2 rounded-full"
                            />
                            <span className="text-[11px] text-muted-foreground font-mono">{item.label}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, boxShadow: "0 15px 40px -10px rgba(0,255,255,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors relative overflow-hidden"
                        data-testid="button-submit-contact"
                      >
                        <motion.div
                          animate={{ x: ["100%", "-100%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                        />
                        <Mail size={18} />
                        Open in Gmail and Send
                        <ExternalLink size={15} className="opacity-70" />
                      </motion.button>

                      <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                        <Lock size={11} />
                        Your details are never stored. This opens your own Gmail to send.
                      </p>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
