import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const hardcodedData = {
  ministries: [
    {
      id: 1,
      name: "Ministry of Education",
      allocation: 628.6,
      efficiency: 85,
      corruptionIndex: 2.3,
      completedPrograms: 12,
      initiatedProjects: 8,
      keyPrograms: [
        "Free Primary Education",
        "Secondary Education Infrastructure",
        "Teacher Training Program",
        "Digital Learning Initiative"
      ],
      leadership: {
        cabinetSecretary: "Hon. Ezekiel Machogu",
        principalSecretary: "Dr. Julius Jwan"
      }
    },
    {
      id: 2,
      name: "Ministry of Health",
      allocation: 141.2,
      efficiency: 78,
      corruptionIndex: 3.1,
      completedPrograms: 9,
      initiatedProjects: 6,
      keyPrograms: [
        "Universal Health Coverage",
        "Medical Equipment Supply",
        "Healthcare Worker Training",
        "Disease Prevention Programs"
      ],
      leadership: {
        cabinetSecretary: "Hon. Susan Nakhumicha",
        principalSecretary: "Dr. Peter Tum"
      }
    },
    {
      id: 3,
      name: "Ministry of Infrastructure",
      allocation: 423.8,
      efficiency: 82,
      corruptionIndex: 2.8,
      completedPrograms: 15,
      initiatedProjects: 10,
      keyPrograms: [
        "Road Network Expansion",
        "Bridge Construction",
        "Public Transport Modernization",
        "Infrastructure Maintenance"
      ],
      leadership: {
        cabinetSecretary: "Hon. Kipchumba Murkomen",
        principalSecretary: "Eng. Julius Korir"
      }
    },
    {
      id: 4,
      name: "Ministry of Agriculture",
      allocation: 89.5,
      efficiency: 75,
      corruptionIndex: 3.4,
      completedPrograms: 7,
      initiatedProjects: 5,
      keyPrograms: [
        "Food Security Program",
        "Irrigation Development",
        "Agricultural Extension Services",
        "Market Access Initiative"
      ],
      leadership: {
        cabinetSecretary: "Hon. Mithika Linturi",
        principalSecretary: "Dr. Paul Ronoh"
      }
    },
    {
      id: 5,
      name: "Ministry of Defense",
      allocation: 156.3,
      efficiency: 88,
      corruptionIndex: 1.9,
      completedPrograms: 6,
      initiatedProjects: 4,
      keyPrograms: [
        "Military Modernization",
        "Border Security Enhancement",
        "Peacekeeping Operations",
        "Defense Infrastructure"
      ],
      leadership: {
        cabinetSecretary: "Hon. Aden Duale",
        principalSecretary: "Maj. Gen. (Rtd) Gordon Kihalangwa"
      }
    },
    {
      id: 6,
      name: "Ministry of Interior",
      allocation: 198.7,
      efficiency: 80,
      corruptionIndex: 2.5,
      completedPrograms: 8,
      initiatedProjects: 6,
      keyPrograms: [
        "National Security Enhancement",
        "Police Modernization",
        "Border Control Systems",
        "Emergency Response"
      ],
      leadership: {
        cabinetSecretary: "Hon. Kithure Kindiki",
        principalSecretary: "Dr. Raymond Omollo"
      }
    },
    {
      id: 7,
      name: "Ministry of Energy",
      allocation: 167.4,
      efficiency: 83,
      corruptionIndex: 2.7,
      completedPrograms: 10,
      initiatedProjects: 7,
      keyPrograms: [
        "Renewable Energy Development",
        "Rural Electrification",
        "Power Grid Modernization",
        "Energy Efficiency Programs"
      ],
      leadership: {
        cabinetSecretary: "Hon. Davis Chirchir",
        principalSecretary: "Eng. Gordon Kihalangwa"
      }
    },
    {
      id: 8,
      name: "Ministry of Water",
      allocation: 112.8,
      efficiency: 76,
      corruptionIndex: 3.2,
      completedPrograms: 9,
      initiatedProjects: 6,
      keyPrograms: [
        "Water Supply Projects",
        "Sanitation Programs",
        "Water Resource Management",
        "Irrigation Development"
      ],
      leadership: {
        cabinetSecretary: "Hon. Alice Wahome",
        principalSecretary: "Dr. Paul Rono"
      }
    },
    {
      id: 9,
      name: "Ministry of ICT",
      allocation: 45.6,
      efficiency: 87,
      corruptionIndex: 2.1,
      completedPrograms: 11,
      initiatedProjects: 8,
      keyPrograms: [
        "Digital Infrastructure",
        "E-Government Services",
        "ICT Skills Development",
        "Innovation Hubs"
      ],
      leadership: {
        cabinetSecretary: "Hon. Eliud Owalo",
        principalSecretary: "Eng. John Tanui"
      }
    },
    {
      id: 10,
      name: "Ministry of Tourism",
      allocation: 34.2,
      efficiency: 79,
      corruptionIndex: 2.9,
      completedPrograms: 6,
      initiatedProjects: 4,
      keyPrograms: [
        "Tourism Marketing",
        "Heritage Conservation",
        "Tourist Infrastructure",
        "Wildlife Protection"
      ],
      leadership: {
        cabinetSecretary: "Hon. Alfred Mutua",
        principalSecretary: "Dr. John Ololtuaa"
      }
    },
    {
      id: 11,
      name: "Ministry of Environment",
      allocation: 28.9,
      efficiency: 81,
      corruptionIndex: 2.4,
      completedPrograms: 7,
      initiatedProjects: 5,
      keyPrograms: [
        "Forest Conservation",
        "Climate Change Mitigation",
        "Waste Management",
        "Environmental Education"
      ],
      leadership: {
        cabinetSecretary: "Hon. Soipan Tuya",
        principalSecretary: "Dr. Chris Kiptoo"
      }
    },
    {
      id: 12,
      name: "Ministry of Sports",
      allocation: 15.7,
      efficiency: 77,
      corruptionIndex: 3.0,
      completedPrograms: 5,
      initiatedProjects: 3,
      keyPrograms: [
        "Sports Infrastructure",
        "Talent Development",
        "International Competitions",
        "Sports Tourism"
      ],
      leadership: {
        cabinetSecretary: "Hon. Ababu Namwamba",
        principalSecretary: "Mr. Peter Tum"
      }
    },
    {
      id: 13,
      name: "Ministry of Youth",
      allocation: 42.3,
      efficiency: 84,
      corruptionIndex: 2.6,
      completedPrograms: 8,
      initiatedProjects: 6,
      keyPrograms: [
        "Youth Empowerment",
        "Skills Development",
        "Enterprise Support",
        "Digital Training"
      ],
      leadership: {
        cabinetSecretary: "Hon. Ababu Namwamba",
        principalSecretary: "Ms. Susan Mang'eni"
      }
    },
    {
      id: 14,
      name: "Ministry of Gender",
      allocation: 18.5,
      efficiency: 86,
      corruptionIndex: 2.2,
      completedPrograms: 6,
      initiatedProjects: 4,
      keyPrograms: [
        "Gender Equality",
        "Women Empowerment",
        "Child Protection",
        "Social Welfare"
      ],
      leadership: {
        cabinetSecretary: "Hon. Aisha Jumwa",
        principalSecretary: "Ms. Veronica Nduva"
      }
    },
    {
      id: 15,
      name: "Ministry of Trade",
      allocation: 67.8,
      efficiency: 82,
      corruptionIndex: 2.8,
      completedPrograms: 9,
      initiatedProjects: 7,
      keyPrograms: [
        "Trade Facilitation",
        "Export Promotion",
        "Market Development",
        "Industrial Growth"
      ],
      leadership: {
        cabinetSecretary: "Hon. Moses Kuria",
        principalSecretary: "Dr. Juma Mukhwana"
      }
    },
    {
      id: 16,
      name: "Ministry of Finance",
      allocation: 892.4,
      efficiency: 89,
      corruptionIndex: 1.8,
      completedPrograms: 14,
      initiatedProjects: 9,
      keyPrograms: [
        "Economic Policy",
        "Revenue Collection",
        "Budget Management",
        "Financial Regulation"
      ],
      leadership: {
        cabinetSecretary: "Hon. Njuguna Ndung'u",
        principalSecretary: "Dr. Julius Muia"
      }
    },
    {
      id: 17,
      name: "Ministry of Foreign Affairs",
      allocation: 45.2,
      efficiency: 88,
      corruptionIndex: 2.0,
      completedPrograms: 7,
      initiatedProjects: 5,
      keyPrograms: [
        "Diplomatic Relations",
        "International Cooperation",
        "Foreign Trade",
        "Consular Services"
      ],
      leadership: {
        cabinetSecretary: "Hon. Musalia Mudavadi",
        principalSecretary: "Amb. Korir Sing'oei"
      }
    },
    {
      id: 18,
      name: "Ministry of Justice",
      allocation: 38.7,
      efficiency: 85,
      corruptionIndex: 2.3,
      completedPrograms: 8,
      initiatedProjects: 6,
      keyPrograms: [
        "Legal Reforms",
        "Judicial Services",
        "Human Rights Protection",
        "Legal Aid"
      ],
      leadership: {
        cabinetSecretary: "Hon. Muturi Njoka",
        principalSecretary: "Ms. Mary Wairagu"
      }
    },
    {
      id: 19,
      name: "Ministry of Transport",
      allocation: 156.9,
      efficiency: 80,
      corruptionIndex: 2.7,
      completedPrograms: 11,
      initiatedProjects: 8,
      keyPrograms: [
        "Road Safety",
        "Public Transport",
        "Railway Development",
        "Port Infrastructure"
      ],
      leadership: {
        cabinetSecretary: "Hon. Kipchumba Murkomen",
        principalSecretary: "Eng. Mohamed Daghar"
      }
    },
    {
      id: 20,
      name: "Ministry of Housing",
      allocation: 78.3,
      efficiency: 83,
      corruptionIndex: 2.5,
      completedPrograms: 9,
      initiatedProjects: 7,
      keyPrograms: [
        "Affordable Housing",
        "Urban Development",
        "Housing Finance",
        "Slum Upgrading"
      ],
      leadership: {
        cabinetSecretary: "Hon. Alice Wahome",
        principalSecretary: "Mr. Charles Hinga"
      }
    },
    {
      id: 21,
      name: "Ministry of Mining",
      allocation: 23.4,
      efficiency: 79,
      corruptionIndex: 3.1,
      completedPrograms: 6,
      initiatedProjects: 4,
      keyPrograms: [
        "Mineral Exploration",
        "Mining Regulation",
        "Value Addition",
        "Environmental Protection"
      ],
      leadership: {
        cabinetSecretary: "Hon. Salim Mvurya",
        principalSecretary: "Mr. Elijah Mwangi"
      }
    }
  ]
};

const MinistryTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const sortedData = [...hardcodedData.ministries].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key] - b[sortConfig.key]
      : b[sortConfig.key] - a[sortConfig.key];
  });

  const filteredData = sortedData.filter(ministry =>
    ministry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search ministries..."
          className="w-full p-2 border-2 border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto border-2 border-gray-700 rounded-lg">
        <table className="min-w-full bg-black">
          <thead>
            <tr className="bg-gray-900 border-b-2 border-gray-700">
              <th 
                className="px-6 py-3 text-left cursor-pointer text-white border-r border-gray-700"
                onClick={() => handleSort('name')}
              >
                Ministry Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer text-white border-r border-gray-700"
                onClick={() => handleSort('allocation')}
              >
                Budget Allocation {sortConfig.key === 'allocation' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer text-white border-r border-gray-700"
                onClick={() => handleSort('efficiency')}
              >
                Efficiency Score {sortConfig.key === 'efficiency' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left cursor-pointer text-white border-r border-gray-700"
                onClick={() => handleSort('corruptionIndex')}
              >
                Corruption Index {sortConfig.key === 'corruptionIndex' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((ministry) => (
              <tr key={ministry.id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="px-6 py-4 text-white border-r border-gray-700">{ministry.name}</td>
                <td className="px-6 py-4 text-white border-r border-gray-700">{formatCurrency(ministry.allocation)}</td>
                <td className="px-6 py-4 text-white border-r border-gray-700">{ministry.efficiency}%</td>
                <td className="px-6 py-4 text-white border-r border-gray-700">{ministry.corruptionIndex}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/ministry/${ministry.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center text-white">
        <div>
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border-2 border-gray-700 rounded disabled:opacity-50 bg-black text-white hover:border-gray-500 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border-2 border-gray-700 rounded disabled:opacity-50 bg-black text-white hover:border-gray-500 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinistryTable; 