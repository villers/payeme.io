import { DocumentReference } from "@firebase/firestore";
import { Timestamp } from "firebase/firestore";

interface BaseRecord {
  id?: string;
  name: string;
}

export interface Job extends BaseRecord {}

export interface City extends BaseRecord {}

export interface Company extends BaseRecord {
  jobs: Job[];
}

export interface Record {
  doc: any;
  id: string;
  city: string;
  companyRef: DocumentReference<Company>;
  company: string;
  jobRef: DocumentReference<Job>;
  job: string;
  note: string;
  contract: string;
  salary: string;
  gender: string;
  study_level: string;
  experience: string;
  createdAt: Timestamp;
}
