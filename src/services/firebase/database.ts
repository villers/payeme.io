import { DocumentData, Query } from "@firebase/firestore";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { firestore } from "@/firebase/config";
import { Company, Job, Record } from "@/interfaces";

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

  /* getReference = async (documentReference: any) => {
    const res = await documentReference.get();
    const data = res.data();

    if (data && documentReference.id) {
      data.uid = documentReference.id;
    }

    return data;
  };

  create = async (data) => {
    return await this.collection.add(data);
  };

  update = async (id, values) => {
    return await this.collection.doc(id).update(values);
  };

  remove = async (id) => {
    return await this.collection.doc(id).delete();
  };*/
}

export const CompaniesService = new DatabaseService<Company>("companies");
export const JobsService = new DatabaseService<Job>("jobs");
export const RecordsService = new DatabaseService<Record>("company_job");
