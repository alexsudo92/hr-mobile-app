import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type Pages = {
  index: undefined;
  signin: undefined;
  signup: undefined;
  vacancyViewer: { id: string };
  vacancyEditor: { id: string };
  candidateViewer: { id: string };
  candidateEditor: { id: string };
};

export type NavigationProp = NativeStackNavigationProp<Pages>;

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

export enum EmploymentStatus {
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
  Hr,
  BranchHead,
}

export type VacancyData = {
  id: string;
  name: string;
  startSalary: number;
  endSalary: number;
  description: string;
  education: string;
  experience: number;
  employment: EmploymentStatus;
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
  name: string;
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
  employment: EmploymentStatus;
  workHours: number;
  respondDate: Date;
  vacancyId: string;
};

export type Workplace = {
  name: string;
  startDate: Date;
  endDate: Date;
};

export type Interaction = {
  id: string;
  candidateId: string;
  date: Date;
  type: InteractionType;
  byId: string;
  message: string;
};
