import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Patient } from "./patient";
import { fetchPatientAPI } from "./patientAPI";



interface PatientState{
    patients:Patient[],
    loading:boolean,
     error: string | null;
}

const initialState: PatientState = {
  patients: [],
  loading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async ()=>{
    return await fetchPatientAPI();
})

const patientSlice = createSlice({
    name:"patients",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
            builder
            .addCase(fetchPatients.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(fetchPatients.fulfilled, (state,action)=>{
                state.loading = false
                state.patients = action.payload
            })
            .addCase(fetchPatients.rejected, (state,action)=>{
                state.loading = false
                state.error = action.error.message??  "Failed to fetch patients.."
            })
    }
})

export default patientSlice.reducer

