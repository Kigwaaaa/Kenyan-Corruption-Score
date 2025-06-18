const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-kenya-white mb-8">About Kenya Finance Watch</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-6">
          Kenya Finance Watch is a non-partisan initiative dedicated to promoting transparency and accountability in government spending. Our platform provides citizens with easy access to detailed information about ministry budgets, expenditures, and financial performance.
        </p>

        <h2 className="text-2xl font-semibold text-kenya-white mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-6">
          To empower citizens with data-driven insights into government spending, enabling informed discussions and promoting accountability in the use of public funds.
        </p>

        <h2 className="text-2xl font-semibold text-kenya-white mt-8 mb-4">What We Do</h2>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>Track and analyze ministry budgets and expenditures</li>
          <li>Monitor financial performance and efficiency metrics</li>
          <li>Provide detailed breakdowns of government spending</li>
          <li>Generate insights and reports on financial trends</li>
        </ul>

        <h2 className="text-2xl font-semibold text-kenya-white mt-8 mb-4">Our Data Sources</h2>
        <p className="text-gray-300 mb-6">
          We gather data from official government sources, including:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>National Treasury reports</li>
          <li>Ministry financial statements</li>
          <li>Auditor General reports</li>
          <li>Public procurement records</li>
        </ul>
      </div>
    </div>
  );
};

export default About; 