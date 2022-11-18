import { DocumentData, DocumentReference, Query } from "@firebase/firestore";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { firestore } from "@/firebase/config";
import { City, Company, Job, Record } from "@/interfaces";

interface FilterParams {
  [k: string]: string;
}

class DatabaseService<T> {
  private readonly collection;

  constructor(private collectionName: string) {
    this.collection = collection(firestore, collectionName);
  }

  getAll = async (filters: FilterParams = {}): Promise<T[]> => {
    const snapshot = await getDocs<T[]>(
      query.call(
        this,
        this.collection,
        ...Object.keys(filters)
          .filter((key) => filters[key] != "")
          .map((key) => {
            return where(key, "==", filters[key]);
          })
      ) as Query<T[]>
    );

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as T)
    );
  };

  getOne = async (id: any): Promise<T> => {
    const docRef = doc(firestore, this.collectionName, id);
    const snapshot = await getDoc(docRef);

    return snapshot.data() as T;
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
