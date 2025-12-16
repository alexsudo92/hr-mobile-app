import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type Pages = {
  index: undefined;
  signin: undefined;
  signup: undefined;
  vacancyViewer: { id: string };
  vacancyEditor: { id: string };
  candidateViewer: { id: string };
  candidateEditor: { id: string };
  candidateInteraction: { id: string };
};

export type NavigationProp = NativeStackNavigationProp<Pages>;

export interface RegistrationDto {
  username: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthenticationDto {
  email: string;
  password: string;
}

export enum VacancyStatus {
  Open,
  Closed,
  OnHold,
}

export enum CandidateStatus {
  New,
  Reviewing,
  Offer,
  Hired,
  Rejected,
}

export enum EmploymentType {
  FullTime,
  Remote,
  PartTime,
  Internship,
}

export enum InteractionType {
  RecievedCall,
  RecievedSms,
  RecievedMail,
  SentCall,
  SentSms,
  SentMail,
  Interview,
  Offer,
  Hired,
  Rejected,
}

export enum Roles {
  Hr = 'Hr',
  BranchHead = 'BranchHead',
  Admin = 'Admin',
}

export type VacancyData = {
  id: string;
  name: string;
  startSalary: number;
  endSalary: number;
  description: string;
  education: string;
  experience: number;
  employment: EmploymentType;
  workHours: number;
  location: string;
  branch: string;
  tags: string[];
  postDate: Date;
  endDate: Date;
  status: VacancyStatus;
  requirements: string[];
  tasks: string[];
  features: string[];
};

export type UserData = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: Roles;
  avatarUrl: string;
  token: string;
};

export type CandidateData = {
  id: string;
  name: string;
  phone: string;
  mail: string;
  salary: number;
  status: CandidateStatus;
  skills: string[];
  workplaces: Workplace[];
  education: string;
  experience: number;
  employment: EmploymentType;
  workHours: number;
  respondDate: Date;
  vacancyIds: string[];
  interactions: Interaction[];
};

export type Workplace = {
  name: string;
  startDate: Date;
  endDate: Date;
};

export type Interaction = {
  id: string;
  date: Date;
  type: InteractionType;
  message: string;
  candidateId: string;
  userId: string;
};

export type Stats = {
  totalVacancies: number;
  totalCandidates: number;
  vacancyStatusCounts: Partial<Record<VacancyStatus, number>>;
  candidateStatusCounts: Partial<Record<CandidateStatus, number>>;
  employmentTypeCounts: Partial<Record<EmploymentType, number>>;
  avgVacancySalary: Partial<Record<EmploymentType, number>>;
  avgCandidateSalary: Partial<Record<EmploymentType, number>>;
};
