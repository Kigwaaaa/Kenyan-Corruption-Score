import React from 'react';
import { Link } from 'react-router-dom';
import sectors from '../data/sectors';

const BudgetAnalysis = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-white">Total Budget: KES 4,143.7 Billion</h2>
        <p className="text-gray-300">2024-2025 Financial Year Budget Analysis Dashboard</p>
        <p className="text-gray-300 mt-2">Executive Allocation: KES 2,488.7 Billion</p>
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Important Notice</h3>
          <p className="text-gray-300 text-sm">
            The budget allocations provided are based on the 2024 Budget Policy Statement (BPS) and related sources. 
            The BPS organizes budget data into sectors rather than individual ministries, which can obscure direct 
            ministry-level allocations. Some ministries are grouped under broader sectors, and specific vote-level 
            details are typically found in the First Schedule or other budget documents like the Program-Based Budget (PBB) 
            or Appropriation Act, 2024.
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Note: Some allocations are estimates based on sectoral breakdowns and may be subject to change following 
            the Supplementary Estimates No. 1 (July 2024) which revised the budget due to the Finance Bill 2024 rejection, 
            reducing ministerial spending by 6.6%.
          </p>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-white">Sector Budget Analysis</h1>
      <div className="bg-black rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <Link 
              to={`/sector/${sector.id}`} 
              key={sector.id}
              className="block bg-black border-2 border-gray-700 hover:border-gray-500 transition-colors rounded-lg p-6 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{sector.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium">Allocation:</span> KES {sector.allocation}B
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Percentage of Budget:</span> {sector.percentage}%
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Efficiency:</span> {sector.efficiency}%
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Corruption Index:</span> {sector.corruptionIndex}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Key Programs:</span>
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-2">
                  {sector.keyPrograms.slice(0, 2).map((program, index) => (
                    <li key={index}>{program}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetAnalysis; 