import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { RootState } from "../../app/store";

interface Job {
  id?: string;
  name: string;
}

interface Company {
  id?: string;
  name: string;
  jobs: Job[];
}

interface InitialState {
  loading: boolean;
  companies: Company[];
  company: Company | null;
  error: any;
}

const initialState: InitialState = {
  loading: false,
  companies: [],
  company: null,
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

    builder
      .addCase(getCompanyByNameAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyByNameAction.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(getCompanyByNameAction.rejected, (state, action) => {
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
      const id = company.id;
      return {
        id,
        ...company.data(),
      } as Company;
    });
  }
);

export const getCompanyByNameAction = createAsyncThunk<Company, string>(
  "company/company_by_name",
  async (name: string, { rejectWithValue }) => {
    const docRef = doc(firestore, "companies", name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const id = docSnap.id;
      return {
        id,
        ...docSnap.data(),
      } as Company;
    }
    return rejectWithValue("La companie n'éxiste pas.");
  }
);

export const {} = slice.actions;

// selectors
export const selectCompany = (state: RootState) => state.company;

export default slice.reducer;
