import * as functions from "firebase-functions";
import {
  createDocument,
  findDocumentById,
  getRef,
  TABLE_COMPANIES,
  TABLE_COMPANY_JOB,
  TABLE_JOBS,
} from "./services/orm";
const slug = require("slug");

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

type form = {
  company: string;
  job: string;
  salary: number;
  study_level: string;
  city: string;
  note: number;
};

export const addJob = functions.https.onCall(async (data: form) => {
  functions.logger.info("Hello addJobs!", { structuredData: true });

  // check if company exist or create
  let companyRef = await findDocumentById(TABLE_COMPANIES, data.company);
  if (!companyRef.exists) {
    await createDocument(TABLE_COMPANIES, { name: data.company }, data.company);
  }

  // check if job exist or create
  let jobRef = await findDocumentById(TABLE_JOBS, data.job);
  if (!jobRef.exists) {
    await createDocument(TABLE_JOBS, { name: data.job }, data.job);
  }

  // add row to company_job
  const result = await createDocument(TABLE_COMPANY_JOB, {
    company: await getRef(`${TABLE_COMPANIES}/${slug(data.company)}`),
    job: await getRef(`${TABLE_JOBS}/${slug(data.job)}`),
    salary: data.salary,
    study_level: data.study_level,
    city: data.city,
    note: data.note,
  });

  functions.logger.info(result, { structuredData: true });

  return { message: "Hello from Firebase!" };
});