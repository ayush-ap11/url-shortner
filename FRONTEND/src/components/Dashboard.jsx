import { Link2, MousePointerClick, PlusCircle, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock recent links (replace with API data)
  const recentLinks = [
    { slug: "yt123", url: "https://youtube.com/...", clicks: 40 },
    { slug: "gh22", url: "https://github.com/...", clicks: 22 },
    { slug: "blog", url: "https://yourblog.com/...", clicks: 8 },
    { slug: "promo", url: "https://promo.site/...", clicks: 15 },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 font-[Inter]">
      {/* Page Heading */}
      <h1 className="text-3xl font-[Open Sans] font-semibold tracking-tight mb-8">
        Dashboard
      </h1>

      {/* 2x2 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-[calc(100vh-140px)]">
        {/* Total Links */}
        <div
          className={`
            rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 
            shadow-md p-8 flex flex-col justify-between
            transition-all duration-200 ease-in
            ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[Open Sans] font-semibold">
              Total Links
            </h2>
            <Link2 className="w-6 h-6 text-purple-400" />
          </div>

          <p className="text-5xl mt-4 font-semibold tracking-tight">124</p>

          <button
            className="
              mt-8 py-3 px-4 rounded-xl
              bg-purple-600 hover:bg-purple-500 transition
              flex items-center justify-center gap-2 font-medium
            "
          >
            <PlusCircle className="w-5 h-5" />
            Create New Link
          </button>
        </div>

        {/* Total Clicks */}
        <div
          className={`
            rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 
            shadow-md p-8 flex flex-col justify-between
            transition-all duration-200 ease-in
            ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[Open Sans] font-semibold">
              Total Clicks
            </h2>
            <MousePointerClick className="w-6 h-6 text-emerald-400" />
          </div>

          <p className="text-5xl mt-4 font-semibold tracking-tight">3,420</p>

          <p className="text-sm text-gray-400 mt-6">
            Total engagement across all short links.
          </p>
        </div>

        {/* Recent Links */}
        <div
          className={`
            rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 
            shadow-md p-8 flex flex-col
            transition-all duration-200 ease-in
            ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-[Open Sans] font-semibold">
              Recent Links
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {recentLinks.slice(0, 10).map((item, index) => (
              <div
                key={index}
                className="
                  p-4 rounded-xl bg-neutral-800/40 border border-stone-800
                  hover:border-purple-400 transition
                "
              >
                <p className="font-medium">{item.slug}</p>
                <p className="text-sm text-gray-400 truncate">{item.url}</p>
                <p className="text-xs mt-1 text-purple-400">
                  {item.clicks} clicks
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Domain */}
        <div
          className={`
            rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 
            shadow-md p-8 flex flex-col
            transition-all duration-200 ease-in
            ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-[Open Sans] font-semibold">
              Custom Domain
            </h2>
            <Globe className="w-6 h-6 text-blue-400" />
          </div>

          <p className="text-sm text-gray-400 mb-4">
            Connect your own domain to generate short links like:
            <br />
            <span className="text-purple-400 font-medium">
              https://yourdomain.com/xyz
            </span>
          </p>

          <form className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="yourdomain.com"
              className="
                w-full py-3 px-4 rounded-xl bg-neutral-800/40 
                border border-stone-800 placeholder-gray-500 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-600/40
              "
            />

            <button
              type="submit"
              className="
                w-full py-3 rounded-xl bg-purple-600 
                hover:bg-purple-500 transition font-medium
              "
            >
              Add Domain
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            You'll need to add DNS records for verification.
          </p>
        </div>
      </div>
    </div>
  );
}
