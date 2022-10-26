import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp();
const firestore = getFirestore(app);

export const TABLE_COMPANIES = "companies";
export const TABLE_JOBS = "jobs";
export const TABLE_COMPANY_JOB = "company_job";

export const findDocumentById = async (collection: string, id: string) => {
  const docRef = firestore.collection(collection).doc(id);
  return await docRef.get();
};

export const createDocument = async (collection: string, data: any, id?: string) => {
  const query = firestore.collection(collection);
  let doc;
  if (id) {
    doc = query.doc(id);
  } else {
    doc = query.doc();
  }

  return await doc.set(data);
};

export const getRef = async (documentPath: string) => firestore.doc(documentPath);
