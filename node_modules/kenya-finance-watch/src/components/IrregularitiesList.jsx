import React from 'react';

const IrregularitiesList = ({ irregularities }) => {
  if (!irregularities || irregularities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Irregularities</h3>
        <p className="text-gray-600">No irregularities reported for this ministry.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Irregularities</h3>
      
      <div className="space-y-6">
        {irregularities.map((irregularity, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium text-red-600">{irregularity.type}</h4>
              <span className={`px-3 py-1 rounded-full text-sm ${
                irregularity.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                irregularity.status === 'Under Investigation' ? 'bg-blue-100 text-blue-800' :
                irregularity.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {irregularity.status}
              </span>
            </div>
            
            <p className="text-gray-700 mb-2">{irregularity.description}</p>
            
            {irregularity.amount && (
              <p className="text-gray-600 text-sm">
                Amount: KSh {irregularity.amount.toLocaleString()} billion
              </p>
            )}
            
            {irregularity.year && (
              <p className="text-gray-600 text-sm">
                Year: {irregularity.year}
              </p>
            )}
          </div>
        ))}
      </div>

      {irregularities[0].courtCases && irregularities[0].courtCases.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Court Cases</h4>
          <div className="space-y-4">
            {irregularities[0].courtCases.map((case_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">{case_.caseName}</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 text-gray-800">{case_.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 text-gray-800">{case_.status}</span>
                  </div>
                  {case_.reason && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Reason:</span>
                      <span className="ml-2 text-gray-800">{case_.reason}</span>
                    </div>
                  )}
                  {case_.namesInvolved && case_.namesInvolved.length > 0 && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Names Involved:</span>
                      <span className="ml-2 text-gray-800">{case_.namesInvolved.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {irregularities[0].denials && irregularities[0].denials.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Official Statements</h4>
          <div className="space-y-4">
            {irregularities[0].denials.map((denial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2">{denial.statement}</p>
                <div className="text-sm text-gray-600">
                  <span>Source: {denial.source}</span>
                  {denial.date && (
                    <span className="ml-4">Date: {denial.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IrregularitiesList; 