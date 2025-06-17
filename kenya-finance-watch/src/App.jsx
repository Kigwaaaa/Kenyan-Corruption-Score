import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MinistryDetails from './pages/MinistryDetails';
import About from './pages/About';
import BudgetAnalysis from './pages/BudgetAnalysis';
import MinistryDetail from './components/MinistryDetail';
import SectorDetail from './components/SectorDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-kenya-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ministries" element={<BudgetAnalysis />} />
            <Route path="/ministries/:name" element={<MinistryDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/ministry/:id" element={<MinistryDetail />} />
            <Route path="/sector/:id" element={<SectorDetail />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-kenya-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Kenya Finance Watch</h3>
                <p className="text-gray-400">
                  Promoting transparency and accountability in government spending
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-400">
                  Email: info@kenyafinancewatch.org<br />
                  Phone: +254 20 123 4567
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-kenya-red">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-400 hover:text-kenya-red">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-400 hover:text-kenya-red">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Kenya Finance Watch. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
