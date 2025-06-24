import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import sectors from '../data/sectors';
import ministriesData from '../data/ministries.json';
import sectorDetails from '../data/sectorDetails';
import { Doughnut } from 'react-chartjs-2';
import { formatKES } from '../utils/format';

const SectorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Convert id to number and find the sector
  const sectorId = parseInt(id);
  const sector = sectors.find(s => s.id === sectorId);
  const { ministries } = ministriesData;
  const sectorInfo = sectorDetails[sector?.name];

  console.log('Sector ID from URL:', id, 'Parsed ID:', sectorId);
  console.log('Available sectors:', sectors.map(s => ({ id: s.id, name: s.name })));
  console.log('Found sector:', sector);

  if (!sector) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Sector Not Found</h2>
        <p className="text-gray-300 mb-4">Sector ID: {id}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const sectorMinistries = ministries.filter(m => sector.ministries.includes(m.id));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Sector Info Card */}
      {sectorInfo && (
        <div className="mb-8 p-6 rounded-2xl shadow-lg bg-white/90 border-l-8 border-kenya-green">
          <h1 className="text-3xl font-bold mb-2 text-kenya-black">{sector.name}</h1>
          <div className="mb-2 text-lg font-semibold text-kenya-red">{sectorInfo.allocation}</div>
          <div className="mb-4 text-gray-700 text-base"><span className="font-bold">Role:</span> {sectorInfo.role}</div>
          <div className="mb-2 text-gray-700 text-base">
            <span className="font-bold">Ministries in this Sector:</span>
            <ul className="list-disc list-inside ml-6 mt-1">
              {sectorMinistries.map((ministry) => (
                <li key={ministry.id}>{ministry.name}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2 text-gray-700 text-base"><span className="font-bold">Challenges:</span> {sectorInfo.challenges}</div>
          <div className="mb-2 text-gray-700 text-base"><span className="font-bold">Corruption Risk:</span> {sectorInfo.corruptionRisk}</div>
          <div className="mb-2 text-gray-700 text-base"><span className="font-bold">Impact:</span> {sectorInfo.impact}</div>
        </div>
      )}
      {/* Two-slice doughnut chart for this sector vs rest of budget */}
      <div className="mb-8 flex flex-col items-center">
        <h4 className="text-lg font-bold mb-2 text-kenya-black">Sector vs Total Budget</h4>
        <div className="mb-2 text-gray-700 font-semibold">
          {formatKES(sector.allocation)} (
          {((sector.allocation / sectors.reduce((sum, s) => sum + s.allocation, 0)) * 100).toFixed(1)}%) of total
        </div>
        <Doughnut
          data={{
            labels: [sector.name, 'All Other Sectors'],
            datasets: [{
              data: [sector.allocation, sectors.reduce((sum, s) => sum + s.allocation, 0) - sector.allocation],
              backgroundColor: ['#CE1126', '#e5e7eb'],
              borderColor: ['#fff', '#fff'],
              borderWidth: 2,
              hoverOffset: 16,
            }]
          }}
          options={{
            cutout: '68%',
            plugins: { 
              legend: { display: true },
              centerText: {
                percentage: ((sector.allocation / sectors.reduce((sum, s) => sum + s.allocation, 0)) * 100).toFixed(1)
              }
            },
            animation: { animateRotate: true, animateScale: true },
            borderRadius: 16
          }}
          plugins={[{
            id: 'centerText',
            afterDraw(chart, args, options) {
              const { ctx, chartArea } = chart;
              ctx.save();
              ctx.font = 'bold 2rem sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = '#CE1126';
              ctx.fillText(`${options.percentage}%`, (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2);
              ctx.restore();
            }
          }]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sector Overview */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm shadow-none">
          <h2 className="text-lg font-semibold text-kenya-black mb-2">Sector Overview</h2>
          <div className="space-y-2">
            <p className="text-gray-800">
              <span className="font-medium">Total Allocation:</span> KES {sector.allocation}B
            </p>
            <p className="text-gray-800">
              <span className="font-medium">Percentage of Budget:</span> {sector.percentage}%
            </p>
            <p className="text-gray-800">
              <span className="font-medium">Efficiency:</span> {sector.efficiency}%
            </p>
            <p className="text-gray-800">
              <span className="font-medium">Corruption Index:</span> {sector.corruptionIndex}
            </p>
          </div>
        </div>

        {/* Key Programs */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm shadow-none">
          <h2 className="text-lg font-semibold text-kenya-black mb-2">Key Programs</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {sector.keyPrograms.map((program, index) => (
              <li key={index}>{program}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ministries in this Sector */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row md:items-center mb-6 gap-1 md:gap-4">
          <h2 className="text-3xl font-extrabold text-kenya-red drop-shadow-sm">Ministries in this Sector</h2>
          <span className="text-base font-semibold text-white bg-kenya-green px-3 py-1 rounded-full shadow-sm mt-1 md:mt-0">(select specific ministry for further details)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorMinistries.map((ministry) => (
            <Link
              to={`/ministry/${ministry.id}`}
              key={ministry.id}
              className="block bg-white border-2 border-kenya-green hover:border-kenya-red transition-all duration-200 rounded-xl p-6 shadow-lg cursor-pointer group transform hover:scale-105 active:scale-95 focus:ring-4 focus:ring-kenya-green/40"
              style={{ boxShadow: '0 0 0 2px #009A49, 0 4px 24px 0 rgba(0,0,0,0.12)' }}
            >
              <h3 className="text-xl font-semibold mb-2 text-kenya-green group-hover:text-kenya-red transition-colors">{ministry.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">
                  <span className="font-medium">Allocation:</span> KES {ministry.allocation}B
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Efficiency:</span> {ministry.financialTracking.efficiency}%
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Corruption Index:</span> {ministry.financialTracking.corruptionIndex}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Completed Programs:</span> {ministry.completedPrograms.length}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Initiated Projects:</span> {ministry.initiatedProjects.length}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorDetail; 