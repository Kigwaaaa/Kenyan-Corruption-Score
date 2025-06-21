import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import sectors from '../data/sectors';
import ministriesData from '../data/ministries.json';

const SectorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Convert id to number and find the sector
  const sectorId = parseInt(id);
  const sector = sectors.find(s => s.id === sectorId);
  const { ministries } = ministriesData;

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
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">{sector.name}</h1>
        <p className="text-gray-300">Sector Details and Ministry Breakdown</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sector Overview */}
        <div className="bg-black border-2 border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Sector Overview</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              <span className="font-medium">Total Allocation:</span> KES {sector.allocation}B
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
          </div>
        </div>

        {/* Key Programs */}
        <div className="bg-black border-2 border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Key Programs</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {sector.keyPrograms.map((program, index) => (
              <li key={index}>{program}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ministries in this Sector */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ministries in this Sector</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorMinistries.map((ministry) => (
            <Link
              to={`/ministry/${ministry.id}`}
              key={ministry.id}
              className="block bg-black border-2 border-gray-700 hover:border-gray-500 transition-colors rounded-lg p-6 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{ministry.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium">Allocation:</span> KES {ministry.allocation}B
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Efficiency:</span> {ministry.financialTracking.efficiency}%
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Corruption Index:</span> {ministry.financialTracking.corruptionIndex}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Completed Programs:</span> {ministry.completedPrograms.length}
                </p>
                <p className="text-gray-300">
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