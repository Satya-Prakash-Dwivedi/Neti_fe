import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Contact Page
 * 
 * Minimalist contact interface for Neti Academy.
 * Focused on premium support and community access via Telegram.
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;
      const senderEmail = import.meta.env.VITE_SENDER_EMAIL;
      const ownerEmail = import.meta.env.VITE_OWNER_EMAIL;

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: { name: "Neti Academy Website", email: senderEmail },
          to: [{ email: ownerEmail, name: "Neti Academy Admin" }],
          subject: `New Contact Form Submission from ${formData.name}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #1e3a8a;">New Contact Request</h2>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${formData.message}</p>
            </div>
          `,
          replyTo: { email: formData.email, name: formData.name }
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        console.error("Brevo Error:", errorData);
        setErrorMessage("Failed to send message. Please try again later.");
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMessage("An unexpected error occurred. Please check your connection.");
      setStatus("error");
    }
  };
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <header className="mb-20 text-center">
          <span className="text-xs font-bold text-blue-900 tracking-[0.3em] uppercase mb-4 inline-block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6">Connect with Neti Academy</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Have a specific doubt or need guidance on your Plan B?
            Our admin team is here to help you find clarity.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-12">
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-200"></span>
                Official Email
              </h3>
              <a
                href="mailto:admin@netiacademy.com"
                className="text-2xl md:text-3xl font-playfair font-bold text-blue-900 hover:text-blue-800 transition-colors break-words"
              >
                admin@netiacademy.com
              </a>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-200"></span>
                Join Our Community
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                For daily PDFs, quick updates, and interactive discussions, join our official Telegram channel.
              </p>
              <a
                href="https://t.me/netiacademy01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 group"
              >
                Join Telegram Channel
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </section>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-7 bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            {/* Subtle brand glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all font-medium text-slate-900"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all font-medium text-slate-900"
                    placeholder="e.g. john.doe@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-900 focus:bg-white transition-all font-medium text-slate-900 resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              {status === "success" && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-sm font-medium">
                  ! {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full py-5 bg-blue-900 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 ${
                  status === "submitting" ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"
                }`}
              >
                {status === "submitting" ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-24 pt-12 border-t border-slate-100 text-center">
          <Link to="/" className="text-sm font-medium text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
