/**
 * FAQ accordion item component
 */
export const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 overflow-hidden transition-all duration-200 hover:border-stone-700">
      <button
        onClick={() => onToggle(index)}
        className="w-full text-left p-6 flex items-center justify-between gap-4"
      >
        <span className="font-[Open Sans] font-medium">{faq.question}</span>
        <span
          className={`text-2xl text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-200 ease-out
          ${isOpen ? "max-h-48" : "max-h-0"}
        `}
      >
        <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
};
