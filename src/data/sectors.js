export const sectors = [
  {
    id: 1,
    name: "Education Sector",
    allocation: 675, // midpoint of 650-700
    percentage: 18.5, // midpoint of 17-20%
    ministries: [1], // Ministry of Education
    keyPrograms: [
      "University Education",
      "Secondary Education",
      "Teacher Interns Hiring"
    ],
    efficiency: 85,
    corruptionIndex: "Low"
  },
  {
    id: 2,
    name: "Infrastructure Sector",
    allocation: 477.2,
    percentage: 16, // estimated
    ministries: [3, 20], // Roads & Transport, Housing & Urban Dev
    keyPrograms: [
      "Roads, Railways, Airports",
      "Housing Projects"
    ],
    efficiency: 82,
    corruptionIndex: "High"
  },
  {
    id: 3,
    name: "Health Sector",
    allocation: 135, // midpoint of 120-150
    percentage: 6,
    ministries: [2], // Ministry of Health
    keyPrograms: [
      "Universal Health Coverage",
      "NHIF Debt Clearance",
      "Social Health Authority"
    ],
    efficiency: 78,
    corruptionIndex: "High"
  },
  {
    id: 4,
    name: "Security Sector",
    allocation: 300, // midpoint of 250-350
    percentage: 10,
    ministries: [5, 6], // Defence, Interior
    keyPrograms: [
      "Police Operations",
      "Military Projects",
      "ID Issuance"
    ],
    efficiency: 84,
    corruptionIndex: "High"
  },
  {
    id: 5,
    name: "Agriculture and Food Security Sector",
    allocation: 65, // midpoint of 50-80
    percentage: 2.5,
    ministries: [4], // Agriculture
    keyPrograms: [
      "Irrigation",
      "Subsidies",
      "Exports"
    ],
    efficiency: 75,
    corruptionIndex: "High"
  },
  {
    id: 6,
    name: "Governance and Public Administration Sector",
    allocation: 65, // midpoint of 50-80
    percentage: 2.5,
    ministries: [21, 22], // Treasury, Public Service
    keyPrograms: [
      "Budget Cuts",
      "Pending Bills",
      "Pension Arrears"
    ],
    efficiency: 80,
    corruptionIndex: "High"
  },
  {
    id: 7,
    name: "Energy and ICT Sector",
    allocation: 100, // midpoint of 80-120
    percentage: 4,
    ministries: [7, 8], // Energy, ICT
    keyPrograms: [
      "Electrification",
      "Digital Economy"
    ],
    efficiency: 80,
    corruptionIndex: "Moderate-High"
  },
  {
    id: 8,
    name: "Environment and Natural Resources Sector",
    allocation: 30, // midpoint of 20-40
    percentage: 1.5,
    ministries: [9, 10], // Environment, Mining
    keyPrograms: [
      "Green Growth",
      "Climate Response",
      "Marine Resources"
    ],
    efficiency: 76,
    corruptionIndex: "Moderate-High"
  },
  {
    id: 9,
    name: "Social Services and Youth Sector",
    allocation: 65, // midpoint of 50-80
    percentage: 2.5,
    ministries: [11, 12], // Youth, Gender
    keyPrograms: [
      "Youth Programs",
      "Gender Equality",
      "Stadiums"
    ],
    efficiency: 77,
    corruptionIndex: "Moderate"
  },
  {
    id: 10,
    name: "Trade and Industry Sector",
    allocation: 40, // midpoint of 30-50
    percentage: 1.5,
    ministries: [13], // Trade
    keyPrograms: [
      "MSMEs",
      "Exports"
    ],
    efficiency: 79,
    corruptionIndex: "High"
  },
  {
    id: 11,
    name: "Water and Sanitation Sector",
    allocation: 40, // midpoint of 30-50
    percentage: 1.5,
    ministries: [14], // Water
    keyPrograms: [
      "Water Projects"
    ],
    efficiency: 76,
    corruptionIndex: "High"
  },
  {
    id: 12,
    name: "Labour and Social Protection Sector",
    allocation: 30, // midpoint of 20-40
    percentage: 1,
    ministries: [15], // Labour
    keyPrograms: [
      "Social Safety Nets"
    ],
    efficiency: 75,
    corruptionIndex: "Moderate"
  },
  {
    id: 13,
    name: "Tourism and Wildlife Sector",
    allocation: 15, // midpoint of 10-20
    percentage: 0.5,
    ministries: [16], // Tourism
    keyPrograms: [
      "Tourism Recovery"
    ],
    efficiency: 78,
    corruptionIndex: "Moderate"
  }
];

export default sectors; 