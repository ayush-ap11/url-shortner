/**
 * Animation wrapper component for staggered entrance animations
 */
export const AnimatedSection = ({ children, delay = 0, className = "" }) => {
  return (
    <div
      className={`
        transition-all duration-500 ease-out
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * Glass card component with iOS-inspired design
 */
export const GlassCard = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`
        rounded-3xl bg-white/5 backdrop-blur-xl 
        border border-stone-800 shadow-2xl
        ${hover ? "hover:bg-white/[0.07] transition-all duration-200" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * Icon container with themed background
 */
export const IconContainer = ({
  children,
  color = "purple",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const colorClasses = {
    purple: "bg-purple-600/10 border-purple-500/30",
    emerald: "bg-emerald-600/10 border-emerald-500/30",
    blue: "bg-blue-600/10 border-blue-500/30",
    orange: "bg-orange-600/10 border-orange-500/30",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} rounded-2xl border
        flex items-center justify-center
        ${colorClasses[color]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * Section header with title and subtitle
 */
export const SectionHeader = ({
  title,
  subtitle,
  className = "",
  centered = true,
}) => {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Open Sans] font-semibold tracking-tight mb-4">
        {title}
      </h1>
      {subtitle && <p className="text-lg text-gray-400">{subtitle}</p>}
    </div>
  );
};

/**
 * Stat card for displaying metrics
 */
export const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
  color = "purple",
}) => {
  const colorClasses = {
    purple: "bg-purple-600/10 text-purple-400",
    emerald: "bg-emerald-600/10 text-emerald-400",
    blue: "bg-blue-600/10 text-blue-400",
  };

  return (
    <GlassCard className="p-8">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-gray-400">{label}</span>
      </div>
      <p className="text-5xl font-semibold tracking-tight mb-2">{value}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </GlassCard>
  );
};
