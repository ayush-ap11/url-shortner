import { useState } from "react";
import {
  Copy,
  ExternalLink,
  Trash2,
  Edit,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { config } from "../config/env";

export const LinkCard = ({ link, onEdit, onDelete, onViewAnalytics }) => {
  const [copied, setCopied] = useState(false);

  const shortUrl = `${config.shortUrlBase}/${link.slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpired =
    link.isExpired ||
    (link.expiresAt && new Date(link.expiresAt) < new Date()) ||
    (link.maxClicks && link.clicks >= link.maxClicks);

  return (
    <div
      className="
        group p-5 rounded-2xl bg-white/5 backdrop-blur-xl 
        border border-stone-800 
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold font-[Open Sans] tracking-tight truncate">
              /{link.slug}
            </h3>
            {isExpired && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                Expired
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 truncate">{link.originalUrl}</p>
        </div>

        <button
          onClick={handleCopy}
          className="
            p-2 rounded-xl text-gray-400 
            hover:text-white hover:bg-white/5
            transition-all duration-200
          "
          title="Copy short URL"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-purple-400">
          <BarChart3 className="w-4 h-4" />
          <span className="font-medium">{link.clicks || 0}</span>
          <span className="text-gray-500">clicks</span>
        </div>

        {link.expiresAt && (
          <div className="text-gray-500 text-xs">
            Expires: {new Date(link.expiresAt).toLocaleDateString()}
          </div>
        )}

        {link.maxClicks && (
          <div className="text-gray-500 text-xs">
            Max: {link.maxClicks} clicks
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex-1 py-2 px-3 rounded-xl text-sm
            bg-purple-600/10 text-purple-400 border border-purple-600/20
            hover:bg-purple-600/20 transition-all duration-200
            flex items-center justify-center gap-1.5
          "
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Visit
        </a>

        <button
          onClick={() => onViewAnalytics(link)}
          className="
            py-2 px-3 rounded-xl text-sm
            bg-white/5 text-gray-300 border border-stone-800
            hover:bg-white/10 hover:text-white transition-all duration-200
            flex items-center gap-1.5
          "
          title="View analytics"
        >
          <BarChart3 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onEdit(link)}
          className="
            py-2 px-3 rounded-xl text-sm
            bg-white/5 text-gray-300 border border-stone-800
            hover:bg-white/10 hover:text-white transition-all duration-200
            flex items-center gap-1.5
          "
          title="Edit link"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onDelete(link)}
          className="
            py-2 px-3 rounded-xl text-sm
            bg-red-500/10 text-red-400 border border-red-500/20
            hover:bg-red-500/20 transition-all duration-200
            flex items-center gap-1.5
          "
          title="Delete link"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default LinkCard;
