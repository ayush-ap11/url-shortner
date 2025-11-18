import { Zap, Sparkles, Users } from "lucide-react";

export const PRICING_PLANS = [
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

export const COMPARISON_FEATURES = [
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

export const PRICING_FAQS = [
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
