import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BudgetAnalysis = () => {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setMinistries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ministry data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        Loading ministry data...
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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((ministry) => (
          <div
            key={ministry.name}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-kenya-green mb-4">
              {ministry.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-600">Cabinet Secretary</h4>
                <p>{ministry.leader.name}</p>
                <p className="text-sm text-gray-500">Since {ministry.leader.tenure}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-600">Financial Overview</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Allocation</p>
                    <p className="font-semibold">{ministry.allocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Efficiency</p>
                    <p className="font-semibold">{ministry.financialTracking.efficiency}%</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-600">Corruption Index</h4>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        ministry.financialTracking.corruptionIndex > 0.5
                          ? 'bg-kenya-red'
                          : 'bg-kenya-green'
                      }`}
                      style={{
                        width: `${ministry.financialTracking.corruptionIndex * 100}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {ministry.financialTracking.corruptionIndex}
                  </p>
                </div>
              </div>

              <Link
                to={`/ministries/${ministry.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block text-center bg-kenya-green text-white py-2 rounded hover:bg-green-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetAnalysis; 