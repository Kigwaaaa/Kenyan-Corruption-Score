export const sectors = [
  {
    id: 1,
    name: "Agriculture, Rural and Urban Development",
    allocation: 180.0,
    percentage: 4.3,
    ministries: [1, 2], // Agriculture and Livestock Development, Lands and Housing
    keyPrograms: [
      "Agricultural Input Subsidy",
      "Land Digitization",
      "Affordable Housing",
      "Urban Planning"
    ],
    efficiency: 75,
    corruptionIndex: "Medium"
  },
  {
    id: 2,
    name: "Energy, Infrastructure, and ICT",
    allocation: 350.0,
    percentage: 8.4,
    ministries: [3, 4, 5], // Energy, Roads and Transport, ICT
    keyPrograms: [
      "Geothermal Development",
      "Road Network Expansion",
      "ICT Hubs",
      "Fiber Optic Expansion"
    ],
    efficiency: 82,
    corruptionIndex: "High"
  },
  {
    id: 3,
    name: "General Economic and Commercial Affairs",
    allocation: 150.0,
    percentage: 3.6,
    ministries: [6, 7, 8], // Trade, MSMEs, Tourism
    keyPrograms: [
      "Industrial Parks",
      "Hustlers Fund",
      "Tourism Promotion",
      "Trade Facilitation"
    ],
    efficiency: 79,
    corruptionIndex: "Medium"
  },
  {
    id: 4,
    name: "Health",
    allocation: 200.0,
    percentage: 4.8,
    ministries: [9], // Health
    keyPrograms: [
      "Universal Health Coverage",
      "NHIF Reforms",
      "Hospital Upgrades",
      "Medical Equipment"
    ],
    efficiency: 78,
    corruptionIndex: "Medium"
  },
  {
    id: 5,
    name: "Education, Technical Training, and Innovation",
    allocation: 666.5,
    percentage: 16.1,
    ministries: [10], // Education
    keyPrograms: [
      "TVET Development",
      "Digital Literacy",
      "Teacher Training",
      "University Funding"
    ],
    efficiency: 85,
    corruptionIndex: "Low"
  },
  {
    id: 6,
    name: "Governance, Justice, Law and Order",
    allocation: 170.0,
    percentage: 4.1,
    ministries: [11], // Interior
    keyPrograms: [
      "Police Modernization",
      "Immigration Services",
      "Governance Reforms",
      "Election Management"
    ],
    efficiency: 84,
    corruptionIndex: "Low"
  },
  {
    id: 7,
    name: "Public Administration and International Relations",
    allocation: 250.0,
    percentage: 6.0,
    ministries: [12, 13, 20, 21], // Foreign Affairs, Public Service, EAC, Treasury
    keyPrograms: [
      "Diplomatic Relations",
      "Public Service Reforms",
      "EAC Integration",
      "Fiscal Management"
    ],
    efficiency: 85,
    corruptionIndex: "Low"
  },
  {
    id: 8,
    name: "National Security",
    allocation: 150.0,
    percentage: 3.6,
    ministries: [14], // Defence
    keyPrograms: [
      "Military Modernization",
      "Border Security",
      "Peacekeeping",
      "Defense Infrastructure"
    ],
    efficiency: 88,
    corruptionIndex: "Low"
  },
  {
    id: 9,
    name: "Social Protection, Culture and Recreation",
    allocation: 100.0,
    percentage: 2.4,
    ministries: [15, 16], // Youth Affairs, Labour
    keyPrograms: [
      "Youth Empowerment",
      "Sports Development",
      "Social Protection",
      "PWD Support"
    ],
    efficiency: 77,
    corruptionIndex: "Medium"
  },
  {
    id: 10,
    name: "Environment Protection, Water and Natural Resources",
    allocation: 120.0,
    percentage: 2.9,
    ministries: [17, 18, 19], // Environment, Water, Mining
    keyPrograms: [
      "Forest Conservation",
      "Water Projects",
      "Mining Development",
      "Blue Economy"
    ],
    efficiency: 76,
    corruptionIndex: "Low"
  }
];

export default sectors; 