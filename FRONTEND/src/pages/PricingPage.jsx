import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui";
import {
  BillingToggle,
  PricingCard,
  ComparisonTable,
  FAQItem,
} from "../components/pricing";
import {
  PRICING_PLANS,
  COMPARISON_FEATURES,
  PRICING_FAQS,
} from "../constants/pricing";

const PricingPage = () => {
  const [animate, setAnimate] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
            <BillingToggle
              billingCycle={billingCycle}
              onToggle={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
            />
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {PRICING_PLANS.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                billingCycle={billingCycle}
                index={index}
                animate={animate}
              />
            ))}
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
            <ComparisonTable features={COMPARISON_FEATURES} />
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
              {PRICING_FAQS.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  index={i}
                  isOpen={openFaq === i}
                  onToggle={(index) =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                />
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
