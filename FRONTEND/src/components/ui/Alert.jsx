// Reusable Alert Component
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

export const Alert = ({ type = "info", message, onClose, className = "" }) => {
  const types = {
    error: {
      icon: AlertCircle,
      bg: "bg-red-500/10",
      border: "border-red-500/50",
      text: "text-red-400",
    },
    success: {
      icon: CheckCircle,
      bg: "bg-green-500/10",
      border: "border-green-500/50",
      text: "text-green-400",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/50",
      text: "text-yellow-400",
    },
    info: {
      icon: Info,
      bg: "bg-blue-500/10",
      border: "border-blue-500/50",
      text: "text-blue-400",
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`p-3 rounded-xl ${config.bg} border ${config.border} ${config.text} text-sm flex items-start gap-2 ${className}`}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <p className="flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
