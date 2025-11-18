import { Check, X } from "lucide-react";
import { Button } from "../ui";

/**
 * Pricing card component for individual plans
 */
export const PricingCard = ({ plan, billingCycle, index, animate }) => {
  const Icon = plan.icon;
  const price =
    billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  const priceDisplay =
    billingCycle === "yearly" ? (price / 12).toFixed(0) : price;

  return (
    <div
      className={`
        relative rounded-3xl bg-white/5 backdrop-blur-xl border 
        transition-all duration-300 ease-out p-8
        ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        ${
          plan.popular
            ? "border-purple-500/50 shadow-lg shadow-purple-500/10 scale-105"
            : "border-stone-800 hover:border-stone-700"
        }
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-xs font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-purple-600/10">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-2xl font-[Open Sans] font-semibold tracking-tight">
          {plan.name}
        </h3>
      </div>

      <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-semibold tracking-tight">
            ${priceDisplay}
          </span>
          <span className="text-gray-500">/month</span>
        </div>
        {billingCycle === "yearly" && price > 0 && (
          <p className="text-xs text-gray-500 mt-1">Billed ${price} annually</p>
        )}
      </div>

      <Button
        variant={plan.popular ? "primary" : "secondary"}
        fullWidth
        className="mb-8"
      >
        {plan.cta}
      </Button>

      <div className="space-y-3">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            {feature.included ? (
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            )}
            <span
              className={`text-sm ${
                feature.included ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
