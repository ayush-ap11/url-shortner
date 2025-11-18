// Reusable Input Component
export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = "",
  containerClassName = "",
  ...props
}) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="text-sm mb-1 block text-gray-300">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <input
          className={`
            w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl
            bg-neutral-800/40 border ${
              error ? "border-red-500" : "border-stone-800"
            }
            placeholder-gray-500 text-white
            focus:outline-none focus:ring-2 focus:ring-purple-500/40
            transition disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
