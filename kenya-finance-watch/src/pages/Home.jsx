import React from 'react';
import { Link } from 'react-router-dom';
import MinistryTable from '../components/MinistryTable';
import BudgetAnalysis from '../components/BudgetAnalysis';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-kenya-black text-kenya-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kenya Finance Watch
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Promoting transparency and accountability in government spending through data-driven insights
            </p>
            <div className="text-gray-300 text-lg leading-relaxed text-left">
              <p className="mb-4">
                <strong>Kenya Finance Watch</strong> is a user-friendly website that shines a light on how Kenya's government spent money in the 2024-2025 financial year, spotlighting the controversial Finance Bill that fueled nationwide protests. The bill initially proposed a KES 3.6 trillion budget, but was reduced to KES 3.2 trillion following massive public demonstrations and the tragic loss of 60 lives. The protests, sparked by proposed tax increases on essential goods and services, forced the government to revise its spending plans.
              </p>
              <p className="mb-4">
                The platform exposes corruption in ministries like Agriculture (high risk) and Education (lower risk) through a clear "Corruption Score." You can dive into tables, simple charts, filter data, or download reports to see where public funds went. Despite the protests and broken promises, leaders like Dr. Debra Barasa stay in power, ignoring public anger.
              </p>
              <p>
                Our data is sourced from the National Treasury's official budget reports, Auditor General's reports, and verified media investigations. This comprehensive approach ensures accurate tracking of public funds and empowers Kenyans to demand accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-kenya-white mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-kenya-red text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-kenya-white mb-3">
                Budget Analysis
              </h3>
              <p className="text-gray-400">
                Track and analyze government spending across ministries, providing detailed breakdowns of budget allocations and expenditures.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-kenya-red text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-kenya-white mb-3">
                Transparency
              </h3>
              <p className="text-gray-400">
                Make government financial data accessible and understandable to citizens, promoting accountability in public spending.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-kenya-red text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-kenya-white mb-3">
                Data Insights
              </h3>
              <p className="text-gray-400">
                Provide comprehensive insights into financial trends, helping citizens understand how their tax money is being utilized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Analysis Preview */}
      <section className="py-16 bg-kenya-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-kenya-white mb-12">
            2024 Financial Bill Analysis
          </h2>
          <BudgetAnalysis />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-kenya-white mb-6">
            Stay Informed About Government Spending
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Access detailed information about ministry budgets, track spending patterns, and understand how public funds are being utilized.
          </p>
          <Link
            to="/ministries"
            className="inline-block bg-kenya-red text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Explore Ministry Details
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 