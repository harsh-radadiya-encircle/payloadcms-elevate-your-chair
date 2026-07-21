import React from 'react';
import { FaCheck } from 'react-icons/fa';

type Tier = { name: string; id?: string };
type TierValue = { hasFeature?: boolean; textValue?: string; id?: string };
type Feature = { featureName: string; tierValues?: TierValue[]; id?: string };

type Props = {
  heading: string;
  tiers?: Tier[];
  features?: Feature[];
};

export const ComparisonTable: React.FC<Props> = ({ heading, tiers, features }) => {
  if (!tiers || !features) return null;

  return (
    <section className="dynamic-section w-full bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-h2-bold text-center tracking-widest uppercase mb-12">
          {heading}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[#1a1a1a] border-collapse min-w-[800px] bg-white">
            <thead>
              <tr>
                <th className="p-4 border border-[#1a1a1a] bg-[#8b8b8b] text-white text-body uppercase tracking-widest font-bold">
                  Benefits & Advantages
                </th>
                {tiers.map((tier, idx) => (
                  <th key={idx} className="p-4 border border-[#1a1a1a] bg-[#8b8b8b] text-white text-center text-h5 uppercase tracking-widest font-bold whitespace-nowrap">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, fIdx) => (
                <tr key={fIdx} className="odd:bg-white even:bg-[#e8e8e8] hover:bg-[#d4d4d4] transition-colors">
                  <td className="p-4 border border-[#1a1a1a] text-h5-bold text-[#1a1a1a]">
                    {feature.featureName}
                  </td>
                  {tiers.map((_, tIdx) => {
                    const val = feature.tierValues?.[tIdx];
                    return (
                      <td key={tIdx} className="p-4 border border-[#1a1a1a] text-center">
                        {val?.textValue ? (
                          <span className="text-h5-bold text-[#1a1a1a]">{val.textValue}</span>
                        ) : val?.hasFeature ? (
                          <FaCheck className="mx-auto text-[#1a1a1a]" />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
