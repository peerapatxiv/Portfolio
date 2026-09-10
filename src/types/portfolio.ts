export interface Address {
  line1: string;
  line2: string;
  line3: string;
}

export interface About {
  firstname: string;
  lastname: string;
  role: string;
  address: Address;
  email: string;
  phone: string;
  linkedin?: string;
  profileTitle: string;
  bio: string;
}

export interface PreviousRole {
  position: string;
  period: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  location: string;
  link: string;
  description: string;
  previousRole?: PreviousRole;
}

export interface Experience {
  title: string;
  items: ExperienceItem[];
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Languages {
  title: string;
  items: LanguageItem[];
}

export interface EducationItem {
  institution: string;
  major: string;
  degree: string;
  period: string;
}

export interface Education {
  title: string;
  items: EducationItem[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface Skills {
  title: string;
  categories: SkillCategory[];
}

export interface ProjectItem {
  name: string;
  period: string;
  description: string;
  link: string;
}

export interface Projects {
  title: string;
  description: string;
  items: ProjectItem[];
}

export interface CertificateItem {
  title: string;
  period: string;
  description: string;
  link: string;
}

export interface Certificates {
  title: string;
  items: CertificateItem[];
}

export interface PortfolioData {
  about: About;
  experience: Experience;
  languages: Languages;
  education: Education;
  skills: Skills;
  projects: Projects;
  certificates: Certificates;
}
