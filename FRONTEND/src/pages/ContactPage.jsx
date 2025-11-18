import { useState, useEffect } from "react";
import { Mail, Send, MessageSquare, Building2, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input } from "../components/ui";

const ContactPage = () => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("success");
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormStatus(null);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Support",
      value: "support@urlshortner.com",
      description: "For technical issues and general help",
    },
    {
      icon: Building2,
      title: "Business",
      value: "business@urlshortner.com",
      description: "Partnerships and enterprise inquiries",
    },
    {
      icon: MessageSquare,
      title: "Billing",
      value: "billing@urlshortner.com",
      description: "Questions about payments and subscriptions",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-[Inter]">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div
            className={`
              text-center mb-16 transition-all duration-500 ease-out
              ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
          >
            <h1 className="text-5xl md:text-6xl font-[Open Sans] font-semibold tracking-tight mb-4">
              We're here to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                {" "}
                help.
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have a question about your links, domains, or billing? Reach out
              anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div
              className={`
                lg:col-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 p-8
                transition-all duration-500 ease-out delay-100
                ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            >
              <h2 className="text-2xl font-[Open Sans] font-semibold tracking-tight mb-6">
                Send us a message
              </h2>

              {formStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-400">
                  <p className="text-sm">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  type="text"
                  name="subject"
                  label="Subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                    className="
                      w-full px-4 py-3 rounded-xl
                      bg-white/5 border border-stone-800
                      text-white placeholder-gray-500
                      focus:outline-none focus:ring-2 focus:ring-purple-600/40 focus:border-purple-600/40
                      transition-all duration-200 resize-none
                    "
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className={`
                      rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 p-6
                      transition-all duration-500 ease-out hover:border-stone-700 hover:bg-white/[0.07]
                      ${
                        animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }
                    `}
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-purple-600/10 flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-[Open Sans] font-semibold mb-1">
                          {method.title}
                        </h3>
                        <a
                          href={`mailto:${method.value}`}
                          className="text-sm text-purple-400 hover:text-purple-300 transition-colors break-all"
                        >
                          {method.value}
                        </a>
                        <p className="text-xs text-gray-500 mt-2">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Response Time */}
              <div
                className={`
                  rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 p-6
                  transition-all duration-500 ease-out delay-500
                  ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-600/10 flex-shrink-0">
                    <Clock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-[Open Sans] font-semibold mb-2">
                      Response Time
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We usually respond within 24–48 hours during business
                      days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div
            className={`
              rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 p-8 text-center
              transition-all duration-500 ease-out delay-600
              ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
          >
            <h3 className="text-xl font-[Open Sans] font-semibold tracking-tight mb-3">
              Looking for something else?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Check out our documentation for technical guides, API references,
              and FAQs. Most questions are answered there.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="secondary">View Documentation</Button>
              <Button variant="secondary">API Reference</Button>
            </div>
          </div>

          {/* Location Info */}
          <div
            className={`
              mt-12 text-center transition-all duration-500 ease-out delay-700
              ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
          >
            <p className="text-sm text-gray-500">
              Based in India • Available worldwide • Remote-first team
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
