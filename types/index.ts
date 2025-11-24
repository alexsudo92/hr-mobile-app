export type Pages = {
  index: undefined;
  signin: undefined;
  signup: undefined;
  viewer: JobData;
  editor: JobData;
};

export enum JobStatus {
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

export type JobData = {
  name: string;
  startSalary: number;
  endSalary: number;
  description: string;
  education: string;
  employment: EmploymentStatus;
  workHours: number;
  branch: string;
  tags: string[];
  postDate: Date;
  endDate: Date;
  status: JobStatus;
  requirements: string[];
};

export type CandidateData = {
  name: string;
  salary: number;
  status: CandidateStatus;
  skills: string[];
  workplaces: string[];
  workplacesDates: Date[];
  education: string;
  experience: number;
  emplyoment: EmploymentStatus;
  workHours: number;
};
