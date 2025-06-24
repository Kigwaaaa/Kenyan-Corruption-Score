import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sectors from '../data/sectors';
import ministriesData from '../data/ministries';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import kenyaFlag from '../assets/kenya-flag.svg';

ChartJS.register(ArcElement, Tooltip, Legend);

function formatKES(amount) {
  if (amount >= 1000) {
    return `KES ${(amount / 1000).toFixed(2)}T`;
  } else if (amount >= 1) {
    return `KES ${amount.toFixed(1)}B`;
  } else {
    return `KES ${(amount * 1000).toFixed(1)}M`;
  }
}

const sectorColors = [
  '#CE1126', // Kenya Red
  '#009A49', // Kenya Green
  '#0033A0', // Blue
  '#F9A602', // Orange
  '#222222', // Black
  '#6C757D', // Grey
  '#00B2A9', // Teal
  '#FFC72C', // Yellow
  '#A7A9AC', // Light Grey
  '#0057B8'  // Deep Blue
];

// Sort sectors by allocation descending
const sortedSectors = [...sectors].sort((a, b) => b.allocation - a.allocation);
const totalBudget = sortedSectors.reduce((sum, s) => sum + s.allocation, 0);

const chartData = {
  labels: sortedSectors.map(s => s.name),
  datasets: [
    {
      data: sortedSectors.map(s => s.allocation),
      backgroundColor: sectorColors,
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 16,
    }
  ]
};

const chartOptions = {
  cutout: '68%',
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percent = ((value / total) * 100).toFixed(1);
          return `${label}: ${formatKES(value)} (${percent}%)`;
        }
      },
      backgroundColor: 'rgba(0,0,0,0.95)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#CE1126',
      borderWidth: 2,
      padding: 14,
      caretSize: 8,
      displayColors: true,
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true
  },
  borderRadius: 16,
  onClick: undefined // We'll handle click in React
};

const BudgetAnalysis = () => {
  const [selectedSectorIdx, setSelectedSectorIdx] = useState(null);

  // Get ministries for a sector (by name)
  const getMinistries = (sector) => {
    if (!ministriesData || !Array.isArray(ministriesData)) return sector.ministries;
    return sector.ministries.map(id => {
      const min = ministriesData.find(m => m.id === id);
      return min ? min.name : `Ministry #${id}`;
    });
  };

  // Chart click handler
  const handleChartClick = (evt, elements) => {
    if (elements && elements.length > 0) {
      setSelectedSectorIdx(elements[0].index);
    }
  };

  // Custom center text plugin
  const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart) {
      const { ctx, chartArea } = chart;
      ctx.save();
      ctx.font = 'bold 1.2rem sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#222';
      ctx.fillText('Total Budget', (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2 - 12);
      ctx.font = 'bold 1.5rem sans-serif';
      ctx.fillStyle = '#CE1126';
      ctx.fillText(formatKES(totalBudget), (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2 + 16);
      ctx.restore();
    }
  };

  return (
    <div className="p-6">
      {/* Total Budget and Executive Allocation before everything */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-white">Total Budget: {formatKES(4143.7)}</h2>
        <p className="text-gray-300">2024-2025 Financial Year Budget Analysis Dashboard</p>
        <p className="text-gray-300 mt-2">Executive Allocation: {formatKES(2488.7)}</p>
      </div>
      {/* Important Notice before the chart */}
      <div className="mb-8">
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
      {/* Kenyan Flag above the chart */}
      <div className="flex flex-col items-center mb-6">
        <img src={kenyaFlag} alt="Kenyan Flag" className="h-12 w-auto mb-2" />
        <h2 className="text-2xl font-bold text-center text-kenya-black mb-2">Sector Budget Allocation</h2>
      </div>
      {/* Stylish Doughnut Chart Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-full max-w-xl p-6 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-gray-100 to-gray-200 border border-gray-200">
          {/* Decorative ring with Kenyan flag colors */}
          <div className="absolute inset-0 rounded-full pointer-events-none z-0" style={{
            background: 'conic-gradient(var(--kenya-black) 0 33%, var(--kenya-red) 33% 66%, var(--kenya-green) 66% 100%)',
            opacity: 0.18
          }}></div>
          <Doughnut 
            data={chartData} 
            options={{
              ...chartOptions,
              onClick: handleChartClick
            }}
            plugins={[centerTextPlugin]}
            className="z-10"
          />
          {/* Popout overlay */}
          {selectedSectorIdx !== null && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-kenya-red p-8 max-w-md w-full relative animate-fade-in">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-kenya-red text-2xl font-bold"
                  onClick={() => setSelectedSectorIdx(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-2 text-kenya-red">{sortedSectors[selectedSectorIdx].name}</h3>
                <p className="mb-2 text-gray-700 font-semibold">Allocation: {formatKES(sortedSectors[selectedSectorIdx].allocation)} ({sortedSectors[selectedSectorIdx].percentage}%)</p>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Ministries:</span>
                  <ul className="list-disc list-inside ml-4 mt-1 text-gray-700">
                    {getMinistries(sortedSectors[selectedSectorIdx]).map((min, i) => (
                      <li key={i}>{min}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/sector/${sortedSectors[selectedSectorIdx].id}`}
                  className="inline-block mt-4 bg-kenya-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Sector Details
                </Link>
              </div>
              {/* Overlay background */}
              <div className="fixed inset-0 bg-black/30 z-10" onClick={() => setSelectedSectorIdx(null)}></div>
            </div>
          )}
        </div>
        {/* Modern Legend/Key */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">
          {sortedSectors.map((sector, idx) => (
            <Link
              to={`/sector/${sector.id}`}
              key={sector.name}
              className="flex items-center space-x-3 py-2 px-3 rounded-xl bg-white/80 shadow border border-gray-200 hover:scale-105 hover:bg-kenya-green/20 transition-transform cursor-pointer group"
              style={{ textDecoration: 'none' }}
            >
              <span className="inline-block w-6 h-3 rounded-full" style={{ backgroundColor: sectorColors[idx] }}></span>
              <span className="font-bold text-gray-800 text-sm group-hover:text-kenya-green transition-colors">{sector.name}</span>
              <span className="text-gray-700 font-semibold text-xs">{formatKES(sector.allocation)} ({sector.percentage}%)</span>
            </Link>
          ))}
        </div>
      </div>
      {/* Existing sector cards */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Sector Budget Analysis</h1>
        <div className="bg-black rounded-lg shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sectors.map((sector) => (
              <Link 
                to={`/sector/${sector.id}`} 
                key={sector.id}
                className="block bg-black border-2 border-gray-700 hover:border-gray-500 transition-colors rounded-lg p-3 hover:shadow-lg min-h-[120px]"
              >
                <h3 className="text-lg font-semibold mb-1 text-white truncate">{sector.name}</h3>
                <div className="space-y-1">
                  <p className="text-gray-300 text-xs">
                    <span className="font-medium">Allocation:</span> {formatKES(sector.allocation)}
                  </p>
                  <p className="text-gray-300 text-xs">
                    <span className="font-medium">Percentage of Budget:</span> {sector.percentage}%
                  </p>
                  <p className="text-gray-300 text-xs">
                    <span className="font-medium">Efficiency:</span> {sector.efficiency}%
                  </p>
                  <p className="text-gray-300 text-xs">
                    <span className="font-medium">Corruption Index:</span> {sector.corruptionIndex}
                  </p>
                  <p className="text-gray-300 text-xs">
                    <span className="font-medium">Key Programs:</span>
                  </p>
                  <ul className="list-disc list-inside text-gray-300 ml-2 text-xs">
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
    </div>
  );
};

export default BudgetAnalysis; 