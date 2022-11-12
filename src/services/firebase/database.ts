import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { firestore } from "../../firebase/config";
import { Company, Job, Record } from "../../interfaces";

class DatabaseService<T> {
  private readonly collection;

  constructor(private collectionName: string) {
    this.collection = collection(firestore, collectionName);
  }

  getAll = async (): Promise<T[]> => {
    const snapshot = await getDocs(this.collection);
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as T;
    });
  };

  getOne = async ({ queryKey }: any): Promise<T> => {
    const id = queryKey[1];

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
