import { DocumentReference, Query } from "@firebase/firestore";
import { collection, doc, getDoc, getDocs, limit, query, startAfter, where } from "firebase/firestore";

import { firestore } from "@/firebase/config";
import { City, Company, Job, Record } from "@/interfaces";

interface FilterParams {
  [k: string]: string | DocumentReference | undefined;
}

class DatabaseService<T> {
  private readonly collection;

  constructor(private collectionName: string) {
    this.collection = collection(firestore, collectionName);
  }

  getAll = async (filters: FilterParams = {}, lastDoc: any = null, limitValue: number = 100): Promise<T[]> => {
    const buildFilter = [
      ...Object.keys(filters)
        .filter((key) => filters[key] != "")
        .map((key) => {
          return where(key, "==", filters[key]);
        }),
      limit(limitValue),
    ];
    if (lastDoc) {
      buildFilter.push(startAfter(lastDoc));
    }
    const snapshot = await getDocs<T[]>(query.call(this, this.collection, ...buildFilter) as Query<T[]>);

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          doc,
          ...doc.data(),
        } as T)
    );
  };

  getOne = async (id: any): Promise<T> => {
    const docRef = doc(firestore, this.collectionName, id);
    const snapshot = await getDoc(docRef);

    const data = snapshot.data() as T;

    return new Promise<T>((resolve, reject) => {
      if (data === undefined) {
        return reject("Document not found");
      }

      return resolve(data);
    });
  };

  getDocumentRef = async (id: any): Promise<DocumentReference> => {
    return doc(firestore, this.collectionName, id);
  };

  getRef = async (docRef: DocumentReference<T>): Promise<T> => {
    const snapshot = await getDoc(docRef);

    return snapshot.data() as T;
  };
}

export const CompaniesService = new DatabaseService<Company>("companies");
export const JobsService = new DatabaseService<Job>("jobs");
export const RecordsService = new DatabaseService<Record>("company_job");
export const CitiesService = new DatabaseService<City>("cities");
