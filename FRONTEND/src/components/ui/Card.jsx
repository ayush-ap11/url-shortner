// Reusable Card Component
export const Card = ({ children, className = "", hover = false, ...props }) => {
  return (
    <div
      className={`
        rounded-2xl bg-white/5 backdrop-blur-xl 
        border border-stone-800 shadow-sm p-8
        ${
          hover
            ? "transition-all hover:scale-[1.02] hover:border-neutral-700"
            : ""
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
