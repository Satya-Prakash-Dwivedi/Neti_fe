import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;

      // Brevo Contacts API Endpoint - This stores the email in your Brevo Dashboard
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          email: email,
          listIds: [2], // Replace with your actual List ID from Brevo Dashboard (Contacts > Lists)
          updateEnabled: true // If the user already exists, update their subscription rather than failing
        })
      });

      if (response.ok || response.status === 204 || response.status === 201) {
        setStatus("success");
        setEmail("");
        // Reset success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorData = await response.json();
        console.error("Brevo Error:", errorData);
        throw new Error(errorData.message || "Failed to subscribe");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          {/* Brand & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-lora font-bold text-[var(--color-neti-accent)] mb-6">NETI ACADEMY</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              A platform for focused exam preparation, with clarity, discipline, and mental balance.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Subscribe to get the current affairs and updates via email.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-xs space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--color-neti-accent)] transition-all font-inter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${status === "success"
                  ? "bg-green-600 text-white"
                  : status === "error"
                    ? "bg-red-600 text-white"
                    : "bg-[var(--color-neti-accent)] text-white hover:bg-[var(--color-neti-accent)] shadow-md active:scale-95"
                  }`}
              >
                {status === "submitting" ? "Subscribing..." :
                  status === "success" ? "Subscribed! ✓" :
                    status === "error" ? "Try Again" : "Subscribe Now"}
              </button>
            </form>
          </div>

          {/* Newsletter/CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-500 mb-6 italic leading-relaxed">
              "Get clarity and daily updates directly in your phone with our community."
            </p>

            <div className="w-full max-w-sm">
              <a
                href="https://t.me/netiacademy01"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-3 shadow-lg active:scale-95 group"
              >
                Join Telegram Channel
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/privacy-policy" className="text-sm text-slate-500 hover:text-[var(--color-neti-accent)] transition-colors">Privacy Policy</a></li>
              <li><a href="/refund-policy" className="text-sm text-slate-500 hover:text-[var(--color-neti-accent)] transition-colors">Refund & Cancellation Policy</a></li>
              <li><a href="/terms-and-conditions" className="text-sm text-slate-500 hover:text-[var(--color-neti-accent)] transition-colors">Terms & Conditions</a></li>
              <li><a href="/contact" className="text-sm text-slate-500 hover:text-[var(--color-neti-accent)] transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] md:text-xs text-slate-400">
            © {currentYear} Neti Academy. All rights reserved.
          </p>
          <div className="text-[10px] md:text-xs text-slate-400 font-medium tracking-tight">
            Clarifying the Journey, One Topic at a Time.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
