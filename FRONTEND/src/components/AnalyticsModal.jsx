import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  TrendingUp,
  MousePointerClick,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Calendar,
} from "lucide-react";
import { fetchAnalytics } from "../store/slices/urlSlice";
import { Spinner } from "./ui";

export const AnalyticsModal = ({ isOpen, onClose, link }) => {
  const dispatch = useDispatch();
  const { analytics, isLoading } = useSelector((state) => state.url);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen && link) {
      dispatch(fetchAnalytics({ slug: link.slug }));
      setTimeout(() => setAnimate(true), 50);
    } else {
      setAnimate(false);
    }
  }, [isOpen, link, dispatch]);

  if (!isOpen) return null;

  const getDeviceIcon = (device) => {
    switch (device?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  // Aggregate analytics data
  const totalClicks =
    analytics?.reduce((sum, day) => sum + (day.clicks || 0), 0) || 0;

  const deviceStats = {};
  const browserStats = {};
  const referrerStats = {};

  analytics?.forEach((day) => {
    day.devices?.forEach((d) => {
      deviceStats[d.device] = (deviceStats[d.device] || 0) + d.count;
    });
    day.browsers?.forEach((b) => {
      browserStats[b.browser] = (browserStats[b.browser] || 0) + b.count;
    });
    day.referrers?.forEach((r) => {
      referrerStats[r.name] = (referrerStats[r.name] || 0) + r.count;
    });
  });

  const deviceData = Object.entries(deviceStats).map(([device, count]) => ({
    device,
    count,
    percentage: totalClicks > 0 ? ((count / totalClicks) * 100).toFixed(1) : 0,
  }));

  const browserData = Object.entries(browserStats)
    .map(([browser, count]) => ({
      browser,
      count,
      percentage:
        totalClicks > 0 ? ((count / totalClicks) * 100).toFixed(1) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const referrerData = Object.entries(referrerStats)
    .map(([name, count]) => ({
      name,
      count,
      percentage:
        totalClicks > 0 ? ((count / totalClicks) * 100).toFixed(1) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`
          w-full max-w-4xl max-h-[90vh] overflow-hidden
          rounded-3xl bg-neutral-900 border border-stone-800
          shadow-2xl transition-all duration-300 ease-out
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 text-zinc-100 z-10 bg-neutral-900/95 backdrop-blur-xl border-b border-stone-800 px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-2xl font-[Open Sans] font-semibold tracking-tight mb-2">
                Analytics
              </h2>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-mono text-purple-400">/{link?.slug}</span>
                <span className="text-gray-600">•</span>
                <a
                  href={link?.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors truncate flex items-center gap-1.5"
                >
                  <span className="truncate">{link?.originalUrl}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            </div>
            <button
              onClick={onClose}
              className="
                p-2 rounded-xl text-gray-400 hover:text-white 
                hover:bg-white/5 transition-all duration-200
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="
                    p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800
                    transition-all duration-200 hover:bg-white/[0.07]
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-purple-600/10">
                      <MousePointerClick className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-sm text-gray-400">Total Clicks</span>
                  </div>
                  <p className="text-3xl font-semibold text-white tracking-tight">
                    {totalClicks.toLocaleString()}
                  </p>
                </div>

                <div
                  className="
                    p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800
                    transition-all duration-200 hover:bg-white/[0.07]
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-emerald-600/10">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-400">Active Days</span>
                  </div>
                  <p className="text-3xl font-semibold text-white tracking-tight">
                    {analytics?.length || 0}
                  </p>
                </div>

                <div
                  className="
                    p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800
                    transition-all duration-200 hover:bg-white/[0.07]
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-blue-600/10">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-400">Avg per Day</span>
                  </div>
                  <p className="text-3xl font-semibold text-white tracking-tight">
                    {analytics?.length > 0
                      ? (totalClicks / analytics.length).toFixed(1)
                      : 0}
                  </p>
                </div>
              </div>

              {/* Devices */}
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 p-6">
                <h3 className="text-lg font-[Open Sans] text-white font-semibold tracking-tight mb-4">
                  Devices
                </h3>
                {deviceData.length > 0 ? (
                  <div className="space-y-3">
                    {deviceData.map((item) => (
                      <div key={item.device} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="text-gray-400">
                              {getDeviceIcon(item.device)}
                            </div>
                            <span className="capitalize text-gray-300">
                              {item.device}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400">
                              {item.count} clicks
                            </span>
                            <span className="font-medium text-white w-12 text-right">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No device data yet
                  </p>
                )}
              </div>

              {/* Browsers */}
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 p-6">
                <h3 className="text-lg font-[Open Sans] text-white font-semibold tracking-tight mb-4">
                  Top Browsers
                </h3>
                {browserData.length > 0 ? (
                  <div className="space-y-3">
                    {browserData.map((item) => (
                      <div key={item.browser} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">
                              {item.browser}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400">
                              {item.count} clicks
                            </span>
                            <span className="font-medium text-white w-12 text-right">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No browser data yet
                  </p>
                )}
              </div>

              {/* Referrers */}
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 p-6">
                <h3 className="text-lg font-[Open Sans] text-white font-semibold tracking-tight mb-4">
                  Top Referrers
                </h3>
                {referrerData.length > 0 ? (
                  <div className="space-y-3">
                    {referrerData.map((item, index) => (
                      <div
                        key={index}
                        className="
                          flex items-center justify-between p-3 rounded-xl
                          bg-white/[0.02] hover:bg-white/5 transition-all duration-200
                        "
                      >
                        <span className="text-sm text-gray-300 truncate flex-1">
                          {item.name === "Direct" ? "Direct / None" : item.name}
                        </span>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-sm text-gray-400">
                            {item.count} clicks
                          </span>
                          <span className="text-sm font-medium text-white w-12 text-right">
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No referrer data yet
                  </p>
                )}
              </div>

              {/* Daily Timeline */}
              {analytics && analytics.length > 0 && (
                <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 p-6">
                  <h3 className="text-lg font-[Open Sans] text-white font-semibold tracking-tight mb-4">
                    Daily Activity
                  </h3>
                  <div className="space-y-2">
                    {analytics
                      .slice()
                      .reverse()
                      .map((day) => (
                        <div
                          key={day.date}
                          className="
                            flex items-center justify-between p-3 rounded-xl
                            bg-white/[0.02] hover:bg-white/5 transition-all duration-200
                          "
                        >
                          <span className="text-sm text-gray-400">
                            {day.date}
                          </span>
                          <span className="text-sm font-medium text-white">
                            {day.clicks} {day.clicks === 1 ? "click" : "clicks"}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
