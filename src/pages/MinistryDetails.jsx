import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MinistryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [ministry, setMinistry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMinistryData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const foundMinistry = data.ministries.find(m => 
          m.name.toLowerCase().replace(/\s+/g, '-') === name
        );
        if (foundMinistry) {
          setMinistry(foundMinistry);
        } else {
          setError('Ministry not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ministry data');
        setLoading(false);
      }
    };
    fetchMinistryData();
  }, [name]);

  if (loading) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        Loading ministry details...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-8 text-kenya-red" role="alert">
        {error}
      </div>
    );
  }
  if (!ministry) {
    return (
      <div className="text-center py-8">
        <p className="text-kenya-red">Ministry not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 btn-primary"
        >
          Return to Home
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary mb-4"
        >
          ← Back to Ministries
        </button>
        <h1 className="text-3xl font-bold text-kenya-green mb-4">{ministry.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Leadership Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-kenya-green mb-4">Leadership</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Cabinet Secretary</h3>
              <p>{ministry.leader.name}</p>
              <p className="text-sm text-gray-600">Since {ministry.leader.tenure}</p>
            </div>
            <div>
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm">{ministry.leader.profile}</p>
            </div>
          </div>
        </div>
        {/* Financial Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-kenya-green mb-4">Financial Overview</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Allocation</h3>
              <p className="text-lg">{ministry.allocation}</p>
            </div>
            <div>
              <h3 className="font-medium">Utilization</h3>
              <p className="text-lg">{ministry.financialTracking.utilized}</p>
            </div>
            <div>
              <h3 className="font-medium">Efficiency Rate</h3>
              <p className="text-lg">{ministry.financialTracking.efficiency}%</p>
            </div>
            <div>
              <h3 className="font-medium">Corruption Index</h3>
              <p className="text-lg">{ministry.financialTracking.corruptionIndex}</p>
            </div>
          </div>
        </div>
        {/* Programs and Projects */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-kenya-green mb-4">Programs and Projects</h2>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Completed Programs</h3>
            <ul className="list-disc list-inside space-y-2">
              {ministry.completedPrograms.map((program, index) => (
                <li key={index} className="text-sm">{program.name} - {program.impact}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Ongoing Projects</h3>
            <ul className="list-disc list-inside space-y-2">
              {ministry.initiatedProjects.map((project, index) => (
                <li key={index} className="text-sm">{project.name} - {project.progress}% complete</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Key Programs</h3>
            <ul className="list-disc list-inside space-y-2">
              {ministry.keyPrograms.map((program, index) => (
                <li key={index} className="text-sm">{program}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetails; 