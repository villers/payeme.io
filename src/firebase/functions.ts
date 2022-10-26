import { functions, httpsCallable } from "./config";

export const addJob = httpsCallable(functions, "addJob");
