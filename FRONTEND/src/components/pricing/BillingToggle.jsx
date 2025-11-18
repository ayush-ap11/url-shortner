/**
 * Billing cycle toggle component (Monthly/Yearly)
 */
export const BillingToggle = ({ billingCycle, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <span
        className={`text-sm ${
          billingCycle === "monthly" ? "text-white" : "text-gray-500"
        }`}
      >
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative w-14 h-7 rounded-full bg-white/10 border border-stone-800 transition-all duration-200"
      >
        <div
          className={`
            absolute top-0.5 w-6 h-6 rounded-full bg-purple-600
            transition-all duration-200 ease-out
            ${billingCycle === "yearly" ? "left-7" : "left-0.5"}
          `}
        />
      </button>
      <span
        className={`text-sm ${
          billingCycle === "yearly" ? "text-white" : "text-gray-500"
        }`}
      >
        Yearly
        <span className="ml-1.5 text-xs text-emerald-400">(Save 17%)</span>
      </span>
    </div>
  );
};
