// Reusable Loading Spinner Component
export const Spinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-t-2 border-b-2 border-purple-500 ${sizes[size]} ${className}`}
    />
  );
};

export const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="text-center">
        <Spinner size="lg" className="mb-4 mx-auto" />
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Spinner;
