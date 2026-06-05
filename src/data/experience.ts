export interface Experience {
  id:          string;
  company:     string;
  role:        string;
  period:      string;           // e.g. "Jan 2023 – Present"
  description: string[];         // bullet points
  tags:        string[];         // skills / tech used
}

export const experiences: Experience[] = [
  {
    id:      'job-1',
    company: 'Millipede Pte Ltd',
    role:    'Software Engineer 1',
    period:  'Jan 2026 – Present',
    description: [
      'Building and shipping mobile app features with React Native and web portal enhancements with React, covering the full cycle from development to App Store and Google Play deployment.',
      'Writing unit tests, running regression QA, and building automated scripts to keep Firebase and BigQuery data clean and reliable.',
    ],
    tags: ['React Native', 'React', 'TypeScript', 'Firebase', 'BigQuery', 'Git'],
  },
  {
    id:      'job-2',
    company: 'VisionPower Semiconductor Manufacturing Company (VSMC)',
    role:    'Software Engineer',
    period:  'Jul 2025 – Jan 2026',
    description: [
      'Built a web app that automated the company\'s entire e-invoice workflow, cutting processing time by over 90% for the finance department.',
      'Developed Java APIs for a warehouse system, maintained ERP apps in Struts/JSP/PL-SQL, and co-built a Selenium automation tool to eliminate repetitive HR reporting tasks.',
    ],
    tags: ['Java', 'Java Struts', 'JSP', 'PL/SQL', 'Python', 'Selenium', 'Agile'],
  },
  {
    id:      'job-3',
    company: 'Halliburton Far East Singapore',
    role:    'Demand Planner',
    period:  'May 2024 – Dec 2024',
    description: [
      'Used data analysis, Excel, and SAP to reduce stranded inventory by over $800K and improve forecast accuracy by 50% across multiple locations.',
      'Built Tableau dashboards to surface supply chain KPIs for stakeholders and keep planning aligned with production.',
    ],
    tags: ['SAP', 'Tableau', 'BigQuery', 'SQL', 'Excel', 'Data Analysis'],
  },
  {
    id:      'job-4',
    company: 'Marvell Asia Pte Ltd',
    role:    'Senior / Analog Layout Engineer',
    period:  'Jul 2022 – May 2024',
    description: [
      'Led a 15-person cross-functional team across Singapore and Taiwan to deliver a 55nm PMIC chip on schedule, coordinating with stakeholders in the US and India throughout.',
      'Created onboarding documentation and training materials that measurably improved ramp-up time for new engineers on the team.',
    ],
    tags: ['Analog Layout', 'DRC/LVS', 'Cadence Virtuoso', 'IC Design', 'Cross-functional Leadership'],
  },
];
