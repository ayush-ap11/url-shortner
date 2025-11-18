/**
 * Feature comparison table component
 */
export const ComparisonTable = ({ features }) => {
  return (
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
            {features.map((feature, i) => (
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
  );
};
