import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { RootState } from "../../app/store";

interface Job {
  name: string;
}

interface Company {
  name: string;
  jobs: Job[];
}

interface InitialState {
  loading: boolean;
  companies: Company[];
  error: any;
}

const initialState: InitialState = {
  loading: false,
  companies: [],
  error: null,
};

export const slice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompaniesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCompaniesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(getAllCompaniesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getAllCompaniesAction = createAsyncThunk<Company[], void>(
  "company/get_all_companies",
  async (): Promise<any> => {
    const docRef = collection(firestore, "companies");
    const docSnap = await getDocs(docRef);

    return docSnap.docs.map((company) => {
      return company.data() as Company;
    });
  }
);

export const {} = slice.actions;

// selectors
export const selectCompany = (state: RootState) => state.company;

export default slice.reducer;
