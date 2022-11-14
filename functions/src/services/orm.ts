import { initializeApp } from "firebase-admin/app";
import { Timestamp, getFirestore } from "firebase-admin/firestore";

const app = initializeApp();
const firestore = getFirestore(app);
const slug = require("slug");

export const TABLE_COMPANIES = "companies";
export const TABLE_JOBS = "jobs";
export const TABLE_COMPANY_JOB = "company_job";

export const findDocumentById = async (collection: string, id: string) => {
  const slugId = slug(id);
  const docRef = firestore.collection(collection).doc(slugId);
  return await docRef.get();
};

export const createDocument = async (collection: string, data: any, id?: string) => {
  const query = firestore.collection(collection);
  let doc;
  if (id) {
    const slugId = slug(id);
    doc = query.doc(slugId);
  } else {
    doc = query.doc();
  }

  return await doc.set(data);
};

export const getRef = async (documentPath: string) => firestore.doc(documentPath);

export const getTimestampNow = () => Timestamp.now();
