export interface Job {
  id?: string;
  name: string;
}

export interface Company {
  id?: string;
  name: string;
  jobs: Job[];
}

export interface Record {
  id: string;
  city: string;
  companyRef: any;
  company: string;
  jobRef: any;
  job: string;
  note: string;
  salary: string;
  study_level: string;
}
