import * as functions from "firebase-functions";
import * as slug from "slug";

import {
  TABLE_CITY,
  TABLE_COMPANIES,
  TABLE_COMPANY_JOB,
  TABLE_JOBS,
  createDocument,
  findDocumentById,
  getRef,
  getTimestampNow,
} from "./services/orm";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

type form = {
  company: string;
  job: string;
  contract: string;
  salary: number;
  study_level: string;
  city: string;
  experience: string;
  note: number;
  userId: string;
  userEmail: string;
  gender: string;
};

export const addJob = functions
  .runWith({
    enforceAppCheck: true, // Requests without valid App Check tokens will be rejected.
  })
  .https.onCall(async (data: form, context) => {
    if (context.app == undefined) {
      functions.logger.error("Context is undefined", { structuredData: true });
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called from an App Check verified app."
      );
    }

    const userData = {
      userId: data.userId,
      userEmail: data.userEmail,
    };

    // check if company exist or create
    let companyRef = await findDocumentById(TABLE_COMPANIES, data.company);
    if (!companyRef.exists) {
      functions.logger.info(`Company ${data.company} is created`, { structuredData: true });
      await createDocument(TABLE_COMPANIES, { name: data.company, ...userData }, data.company);
    }

    // check if job exist or create
    let jobRef = await findDocumentById(TABLE_JOBS, data.job);
    if (!jobRef.exists) {
      functions.logger.info(`Job ${data.job} is created`, { structuredData: true });
      await createDocument(TABLE_JOBS, { name: data.job, ...userData }, data.job);
    }

    // check if localisation exist or create
    let cityRef = await findDocumentById(TABLE_CITY, data.city);
    if (!cityRef.exists) {
      functions.logger.info(`City ${data.city} is created`, { structuredData: true });
      await createDocument(TABLE_CITY, { name: data.city, ...userData }, data.city);
    }

    // add row to company_job
    const result = await createDocument(TABLE_COMPANY_JOB, {
      companyRef: await getRef(`${TABLE_COMPANIES}/${slug(data.company)}`),
      jobRef: await getRef(`${TABLE_JOBS}/${slug(data.job)}`),
      cityRef: await getRef(`${TABLE_CITY}/${slug(data.city)}`),
      city: data.city,
      company: data.company,
      job: data.job,
      salary: data.salary,
      contract: data.contract,
      study_level: data.study_level,
      note: data.note,
      experience: data.experience,
      gender: data.gender,
      userId: userData.userId,
      userEmail: userData.userEmail,
      createdAt: getTimestampNow(),
    });

    functions.logger.info(result, { structuredData: true });

    return { message: "ok" };
  });
