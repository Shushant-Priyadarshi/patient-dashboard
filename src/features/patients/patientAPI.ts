import axios from "axios";
import type { Patient } from "./patient"


const BASE_URL = "https://dummyjson.com/users"

export const fetchPatientAPI =  async (): Promise<Patient[]> =>{
     const response = await axios.get(`${BASE_URL}`);
     return response.data.users;
}

export const fetchPatientById =  async (id:number): Promise<Patient> =>{
     const response = await axios.get(`${BASE_URL}/${id}`);
     return response.data;
}

export const updatePatientById = async (id:number, updateData:Partial<Patient>): Promise<Patient> =>{
     const response =await axios.put(`${BASE_URL}/${id}`,updateData,{
          headers: {
      "Content-Type": "application/json",
    },
     })
     return response.data
}

export const deletePatientById = async(id :number):Promise<Patient> =>{
     const response = await axios.delete(`${BASE_URL}/${id}`)
     return response.data
}

export const addNewPatientAPI = async (patient: Partial<Patient>) => {
  const response = await axios.post(`${BASE_URL}/add`, patient, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
