import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import {
  WhatsAppIcon,
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/SocialIcons";
import { CONTACT } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";
import contactBg from "../assets/images/ContactImage.jpeg";

export default function Contact() {
  useReveal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    // Simulate submission
    setSubmitted(true);
    toast.success("Thank you! Your message has been received.");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />

      {/* Hero section */}
      <div className="relative overflow-hidden min-h-[40vh] md:min-h-[80vh] flex items-center bg-primary py-12 text-primary-foreground">
        <img
          src={contactBg}
          alt="Waseem Motors Showroom"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.05_255)]/70 via-[oklch(0.25_0.055_255)]/50 to-[oklch(0.3_0.06_255)]/25" />
        <div className="container relative text-center w-full">
          <p className="kicker mb-3 text-primary-foreground tracking-[0.2em] font-bold drop-shadow">
            Dealership details
          </p>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight md:text-5xl drop-shadow-md text-white">
            Contact Waseem Motors
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white md:text-base font-semibold drop-shadow-sm">
            Have questions about our vehicle stock or listing services? Drop us
            a line, visit our showroom, or chat on WhatsApp. We are here to
            help.
          </p>
        </div>
      </div>

      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Left Column: Form */}
          <div className="reveal rounded-lg border border-border bg-card p-6 shadow-sm">
            {submitted ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                <CheckCircle className="h-14 w-14 text-primary" />
                <h2 className="mt-5 text-2xl font-display font-bold uppercase tracking-tight">
                  Message Sent Successfully!
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Thank you for reaching out, <strong>{name}</strong>. Our team
                  will review your message and get back to you shortly at{" "}
                  <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                  className="mt-6 rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-shadow hover:shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-display font-bold uppercase tracking-tight">
                  Send Us A Message
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill out the form below and we will contact you within 24
                  hours.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Ali Ahmed"
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. ali@domain.com"
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 03001234567"
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    >
                      <option value="Inquiry">General Inquiry</option>
                      <option value="Buying">Buying a Vehicle</option>
                      <option value="Selling">Selling my Vehicle</option>
                      <option value="Spare Parts">Spare Parts Info</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Write details of your query..."
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-shadow hover:shadow-lg"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Cards */}
          <div className="space-y-6">
            {/* Contact details card */}
            <div className="reveal rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-display font-bold uppercase tracking-tight">
                Quick Contacts
              </h2>
              <div className="mt-5 space-y-4">
                {/* Phone Numbers */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2">
                    Call Showrooms
                  </p>
                  <div className="space-y-2">
                    {CONTACT.phones.map(p => (
                      <a
                        key={p.number}
                        href={`tel:${p.number}`}
                        className="flex items-center gap-3 rounded-md border border-border bg-secondary/10 p-2.5 hover:border-primary/50 transition-colors group text-left"
                      >
                        <div className="rounded-full bg-primary/10 p-1.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Phone className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-card-foreground">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {p.number}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2">
                    WhatsApp Chat
                  </p>
                  <a
                    href="https://wa.me/923332834567"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-md border border-border bg-[#25D366]/5 p-2.5 hover:border-[#25D366]/50 transition-colors group text-left"
                  >
                    <div className="rounded-full bg-[#25D366]/10 p-1.5 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-card-foreground">
                        Muhammad Waseem Awan
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        0333-2834567
                      </p>
                    </div>
                  </a>
                </div>

                {/* Emails */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2">
                    Email Addresses
                  </p>
                  <div className="space-y-2">
                    {CONTACT.emails.map(email => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="flex items-center gap-3 rounded-md border border-border bg-secondary/10 p-2.5 hover:border-primary/50 transition-colors group text-left"
                      >
                        <div className="rounded-full bg-primary/10 p-1.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Mail className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-semibold text-card-foreground break-all">
                          {email}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="reveal rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-display font-bold uppercase tracking-tight">
                Official Socials
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Follow our official channels for fresh arrivals and updates.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://wa.me/923332834567"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all hover:bg-[#25D366] hover:text-white hover:scale-105"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@waseemmotorsbhakkar.786"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all hover:bg-[#FF0000] hover:text-white hover:scale-105"
                >
                  <YouTubeIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@waseem_motors_official?_r=1&_t=ZS-98lH3a1g6hI"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all hover:bg-black hover:text-white hover:scale-105"
                >
                  <TikTokIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.instagram.com/waseem_motors_official?igsh=cWhqbGtlNTVzb2No"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all hover:bg-[#E1306C] hover:text-white hover:scale-105"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100086322109876&rdid=vFsJHBZTN2A2Bm7i&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DtkhjazGV%2F#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all hover:bg-[#1877F2] hover:text-white hover:scale-105"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Hours and showroom card */}
            <div className="reveal rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-display font-bold uppercase tracking-tight">
                Showrooms & Hours
              </h2>
              <div className="mt-5 space-y-5">
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                    Showroom Locations
                  </p>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-card-foreground">
                        Cars Showroom
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {CONTACT.showrooms.Car}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-card-foreground">
                        Tractors Showroom
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {CONTACT.showrooms.Tractor}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-card-foreground">
                        Bikes Showroom
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {CONTACT.showrooms.Bike}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Opening Hours
                    </p>
                    <div className="text-xs font-semibold mt-1 space-y-1">
                      <p>Monday — Saturday: 9:00 AM — 8:00 PM</p>
                      <p className="text-muted-foreground font-normal">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
