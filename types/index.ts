export type Pages = {
  index: undefined;
  signin: undefined;
  signup: undefined;
  jobViewer: {id: string}
  jobEditor: {id: string}
};

export enum JobStatus {
  Open,
  Closed,
  OnHold
}

export enum CandidateStatus {
  New,
  Reviewing,
  Offer,
  Hired,
  Rejected
}

export enum EmploymentStatus {
  FullTime,
  Remote,
  PartTime,
  Internship
}

export enum Roles {
  Hr,
  BranchHead
}

export type JobData = {
  id: string;
  name: string;
  startSalary: number;
  endSalary: number;
  description: string;
  education: string;
  employment: EmploymentStatus;
  workHours: number;
  location: string;
  branch: string;
  tags: string[];
  postDate: Date;
  endDate: Date;
  status: JobStatus;
  requirements: string[];
};

export type UserData = {
  firstname: string;
  secondname: string;
  role: Roles;
  avatarUrl: string;
  token: string;
}

export type CandidateData = {
  id: string;
  name: string;
  salary: number;
  status: CandidateStatus;
  skills: string[];
  workplaces: string[];
  workplacesDates: Date[];
  education: string;
  experience: number;
  employment: EmploymentStatus;
  workHours: number;
  respondDate: Date;
  jobId: string;
};

export type Interaction = {
  candidateId: string;
}