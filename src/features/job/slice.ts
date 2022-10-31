import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { RootState } from "../../app/store";

interface Job {
  name: string;
}

interface InitialState {
  loading: boolean;
  jobs: Job[];
  job: Job | null;
  error: any;
}

const initialState: InitialState = {
  loading: false,
  jobs: [],
  job: null,
  error: null,
};

export const slice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobAction.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getAllJobAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getJobByNameAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobByNameAction.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(getJobByNameAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getAllJobAction = createAsyncThunk<Job[], void>("job/get_all_jobs", async (): Promise<any> => {
  const docRef = collection(firestore, "jobs");
  const docSnap = await getDocs(docRef);

  return docSnap.docs.map((job) => {
    return job.data() as Job;
  });
});

export const getJobByNameAction = createAsyncThunk<Job, string>(
  "job/job_by_name",
  async (name: string, { rejectWithValue }) => {
    const docRef = doc(firestore, "jobs", name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Job;
    }
    return rejectWithValue("Le job n'éxiste pas.");
  }
);

export const {} = slice.actions;

// selectors
export const selectJob = (state: RootState) => state.job;

export default slice.reducer;
