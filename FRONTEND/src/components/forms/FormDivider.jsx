// Form Divider Component
export const FormDivider = ({ text = "Or continue with" }) => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-stone-800"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-neutral-900 text-gray-400">{text}</span>
      </div>
    </div>
  );
};

export default FormDivider;
