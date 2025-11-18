import { useState, useEffect } from "react";
import { Check, X, Zap, Sparkles, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui";

const PricingPage = () => {
  const [animate, setAnimate] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      name: "Free",
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for individuals getting started",
      features: [
        { text: "100 short links", included: true },
        { text: "Unlimited redirects", included: true },
        { text: "Basic analytics", included: true },
        { text: "QR Codes", included: true },
        { text: "Custom domains", included: false },
        { text: "Link expiration", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      icon: Sparkles,
      price: { monthly: 9, yearly: 90 },
      description: "For freelancers and creators who need more",
      features: [
        { text: "Unlimited short links", included: true },
        { text: "Unlimited clicks", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom domains (3)", included: true },
        { text: "Custom slug", included: true },
        { text: "Link expiration", included: true },
        { text: "Priority redirect speed", included: true },
        { text: "Email support", included: true },
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Business",
      icon: Users,
      price: { monthly: 29, yearly: 290 },
      description: "For teams and companies at scale",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Custom domains (10)", included: true },
        { text: "Team members (5)", included: true },
        { text: "Team access controls", included: true },
        { text: "99.9% SLA uptime", included: true },
        { text: "Batch link creation", included: true },
        { text: "API access", included: true },
        { text: "Priority support", included: true },
      ],
      cta: "Start Business Trial",
      popular: false,
    },
  ];

  const comparisonFeatures = [
    {
      name: "Short links",
      free: "100",
      pro: "Unlimited",
      business: "Unlimited",
    },
    {
      name: "Monthly clicks",
      free: "5,000",
      pro: "Unlimited",
      business: "Unlimited",
    },
    {
      name: "Analytics retention",
      free: "30 days",
      pro: "1 year",
      business: "Forever",
    },
    { name: "Custom domains", free: "—", pro: "3", business: "10" },
    { name: "Team members", free: "1", pro: "1", business: "5" },
    { name: "API access", free: "—", pro: "—", business: "✓" },
    { name: "Support", free: "Community", pro: "Email", business: "Priority" },
  ];

  const faqs = [
    {
      question: "How does click tracking work?",
      answer:
        "Every time someone clicks your short link, we track the visit including device type, browser, location, and referrer. All data is stored securely and available in your analytics dashboard.",
    },
    {
      question: "Can I use my own custom domain?",
      answer:
        "Yes! Pro and Business plans support custom domains. Simply add your domain, configure DNS settings, and start using it for your branded short links.",
    },
    {
      question: "Do unused links expire?",
      answer:
        "No, your links never expire unless you set a custom expiration date. Free plan links remain active as long as your account is active.",
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer:
        "Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your billing cycle.",
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer:
        "For Free plan users exceeding limits, you'll be prompted to upgrade. Pro and Business plans have no click limits, so you never have to worry.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-[Inter]">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div
            className={`
              text-center mb-16 transition-all duration-500 ease-out
              ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
          >
            <h1 className="text-5xl md:text-6xl font-[Open Sans] font-semibold tracking-tight mb-4">
              Shorten smarter. Pay only
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                for what you need.
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Transparent pricing with no hidden limits. Start free, upgrade
              when you grow.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span
                className={`text-sm ${
                  billingCycle === "monthly" ? "text-white" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly"
                  )
                }
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
                <span className="ml-1.5 text-xs text-emerald-400">
                  (Save 17%)
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price =
                billingCycle === "monthly"
                  ? plan.price.monthly
                  : plan.price.yearly;
              const priceDisplay =
                billingCycle === "yearly" ? (price / 12).toFixed(0) : price;

              return (
                <div
                  key={plan.name}
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

                  <p className="text-sm text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-semibold tracking-tight">
                        ${priceDisplay}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    {billingCycle === "yearly" && price > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Billed ${price} annually
                      </p>
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
            })}
          </div>

          {/* Feature Comparison */}
          <div
            className={`
              mb-20 transition-all duration-500 ease-out delay-300
              ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
          >
            <h2 className="text-3xl font-[Open Sans] font-semibold tracking-tight text-center mb-8">
              Compare Plans
            </h2>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-stone-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-800">
                      <th className="text-left p-6 font-[Open Sans] font-medium text-gray-400">
                        Feature
                      </th>
                      <th className="text-center p-6 font-[Open Sans] font-medium">
                        Free
                      </th>
                      <th className="text-center p-6 font-[Open Sans] font-medium bg-purple-600/5">
                        Pro
                      </th>
                      <th className="text-center p-6 font-[Open Sans] font-medium">
                        Business
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, i) => (
                      <tr
                        key={i}
                        className="border-b border-stone-800/50 hover:bg-white/[0.02]"
                      >
                        <td className="p-6 text-gray-300">{feature.name}</td>
                        <td className="p-6 text-center text-gray-400">
                          {feature.free}
                        </td>
                        <td className="p-6 text-center bg-purple-600/5">
                          {feature.pro}
                        </td>
                        <td className="p-6 text-center text-gray-300">
                          {feature.business}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div
            className={`
              mb-20 transition-all duration-500 ease-out delay-400
              ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
          >
            <h2 className="text-3xl font-[Open Sans] font-semibold tracking-tight text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 overflow-hidden transition-all duration-200 hover:border-stone-700"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4"
                  >
                    <span className="font-[Open Sans] font-medium">
                      {faq.question}
                    </span>
                    <span
                      className={`text-2xl text-gray-400 transition-transform duration-200 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`
                      overflow-hidden transition-all duration-200 ease-out
                      ${openFaq === i ? "max-h-48" : "max-h-0"}
                    `}
                  >
                    <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            className={`
              text-center rounded-3xl bg-gradient-to-br from-purple-600/20 to-purple-400/10 
              backdrop-blur-xl border border-purple-500/30 p-12
              transition-all duration-500 ease-out delay-500
              ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
          >
            <h2 className="text-3xl font-[Open Sans] font-semibold tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Start for free, no credit card required. Upgrade anytime as you
              grow.
            </p>
            <Button variant="primary" className="px-8">
              Start Free Now
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              14-day free trial on all paid plans
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
