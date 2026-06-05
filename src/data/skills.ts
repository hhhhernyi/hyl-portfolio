export interface SkillGroup {
  label:  string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label:  'Languages',
    skills: ['JavaScript', 'TypeScript', 'Java', 'Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    label:  'Frontend',
    skills: ['React', 'React Native', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label:  'Backend',
    skills: ['Node.js', 'Express.js', 'Java Struts', 'JSP', 'RESTful APIs'],
  },
  {
    label:  'Databases & Cloud',
    skills: ['MongoDB', 'PL/SQL', 'Firebase', 'Supabase', 'BigQuery'],
  },
  {
    label:  'Tools',
    skills: ['Git', 'Mocha/Chai', 'Selenium', 'Tableau', 'Agile / Scrum'],
  },
];
