import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { RootState } from "../../app/store";
import { addJob } from "../../firebase/functions";

interface Job {
  id?: string;
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

    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getAllJobAction = createAsyncThunk<Job[], void>("job/get_all_jobs", async (): Promise<any> => {
  const docRef = collection(firestore, "jobs");
  const docSnap = await getDocs(docRef);

  return docSnap.docs.map((job) => {
    const id = job.id;
    return {
      id,
      ...job.data(),
    } as Job;
  });
});

export const getJobByNameAction = createAsyncThunk<Job, string>(
  "job/job_by_name",
  async (name: string, { rejectWithValue }) => {
    const docRef = doc(firestore, "jobs", name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const id = docSnap.id;
      return {
        id,
        ...docSnap.data(),
      } as Job;
    }
    return rejectWithValue("Le job n'éxiste pas.");
  }
);

export interface CreateJobQuery {
  company: string;
  job: string;
  salary: number;
  study_level: string;
  city: string;
  note: number;
}

export const createJob = createAsyncThunk<any, CreateJobQuery>("job/create", async (data, { rejectWithValue }) => {
  return addJob(data)
    .then((result) => {
      console.log(result);
    })
    .catch((err: any) => {
      return rejectWithValue(err.message);
    });
});

export const {} = slice.actions;

// selectors
export const selectJob = (state: RootState) => state.job;

export default slice.reducer;
