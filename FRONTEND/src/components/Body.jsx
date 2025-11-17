import { Link2, Globe, BarChart2, QrCode } from "lucide-react";
import { useEffect, useState } from "react";

export default function Body() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Link2,
      title: "Instant URL Shortening",
      description:
        "Shorten long URLs instantly with clean, fast, and secure redirects optimized for performance.",
      color: "orange",
      gradient: "from-orange-500/10",
    },
    {
      icon: Globe,
      title: "Custom Domains",
      description:
        "Add your own custom domain to create branded short links that build trust and professionalism.",
      color: "violet",
      gradient: "from-violet-500/10",
    },
    {
      icon: BarChart2,
      title: "Click Analytics",
      description:
        "Track clicks, referrers, user devices, and daily traffic with minimal yet powerful analytics.",
      color: "blue",
      gradient: "from-blue-500/10",
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description:
        "Every short link gets an auto-generated QR code that you can download and use anywhere.",
      color: "emerald",
      gradient: "from-emerald-500/10",
    },
  ];

  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 font-[Inter]">
      {/* Center Card Container */}
      <div
        className={`
          max-w-6xl w-full bg-neutral-900 border border-neutral-800 
          rounded-3xl shadow-2xl p-10 md:p-16 transition-all duration-200
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight font-[Open Sans]">
            Powerful Features That Make Shortening Smarter
          </h2>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
            Everything you need to shorten, track, and manage your links in a
            single elegant dashboard.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="
                  relative group overflow-hidden rounded-2xl 
                  bg-neutral-900 border border-neutral-800 p-8 shadow-xl 
                  transition-all duration-300 hover:scale-[1.03] hover:border-neutral-700
                "
              >
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-br ${feature.gradient} to-transparent 
                    opacity-0 group-hover:opacity-20 transition-all
                  `}
                ></div>

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 bg-${feature.color}-500 rounded-xl text-black`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-[Open Sans] font-semibold">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
