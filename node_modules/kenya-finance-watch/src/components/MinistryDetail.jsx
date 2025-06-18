import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IrregularitiesList from './IrregularitiesList';

const MinistryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ministry, setMinistry] = useState(null);
  const [irregularities, setIrregularities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch ministry data
        const ministryResponse = await fetch('/data.json');
        if (!ministryResponse.ok) {
          throw new Error(`Failed to fetch ministry data: ${ministryResponse.statusText}`);
        }
        const ministryData = await ministryResponse.json();
        const ministryInfo = ministryData.ministries.find(m => m.id === parseInt(id));
        
        if (!ministryInfo) {
          throw new Error('Ministry not found');
        }

        // Fetch irregularities data
        const irregularitiesResponse = await fetch('/irregularities.json');
        if (!irregularitiesResponse.ok) {
          throw new Error(`Failed to fetch irregularities data: ${irregularitiesResponse.statusText}`);
        }
        const irregularitiesData = await irregularitiesResponse.json();
        const ministryIrregularities = irregularitiesData.irregularities.find(
          i => i.ministryId === parseInt(id)
        );

        setMinistry(ministryInfo);
        setIrregularities(ministryIrregularities);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !ministry) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error || 'Ministry not found'}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-sm text-red-600 hover:text-red-800"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ministry Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{ministry.name}</h1>
          <p className="text-gray-600 mb-4">{ministry.sector}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Budget Allocation</h3>
              <p className="text-2xl font-semibold text-gray-900">
                KSh {ministry.allocation.toLocaleString()} billion
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Efficiency Rating</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {ministry.financialTracking.efficiency}%
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Corruption Index</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {ministry.financialTracking.corruptionIndex}
              </p>
            </div>
          </div>
        </div>

        {/* Irregularities Section */}
        {irregularities && (
          <IrregularitiesList irregularities={[irregularities]} />
        )}

        {/* Completed Programs */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Programs</h3>
          <div className="space-y-4">
            {ministry.completedPrograms.map((program, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="text-lg font-medium text-gray-900">{program.name}</h4>
                <p className="text-gray-600">{program.description}</p>
                {program.impact && (
                  <p className="text-sm text-gray-500 mt-2">Impact: {program.impact}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Initiated Projects */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Initiated Projects</h3>
          <div className="space-y-4">
            {ministry.initiatedProjects.map((project, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="text-lg font-medium text-gray-900">{project.name}</h4>
                <p className="text-gray-600">{project.description}</p>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Status: </span>
                  <span className={`text-sm ${
                    project.status === 'On Track' ? 'text-green-600' :
                    project.status === 'Delayed' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetail; 