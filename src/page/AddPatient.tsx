import { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { addNewPatientAPI } from "../features/patients/patientAPI";
import type { Patient } from "../features/patients/patient";
import { Button } from "primereact/button";

const AddPatient = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    bloodGroup: "",
    age: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();

    const newPatient: Partial<Patient> = {
      ...form,
      age: Number(form.age),
    };

    try {
      const response = await addNewPatientAPI(newPatient);
      toast.success("Patient added successfully!", { transition: Bounce });
      setForm({
        firstName: "",
        lastName: "",
        gender: "",
        bloodGroup: "",
        age: "",
      });
      console.log(response);
    } catch (err) {
      toast.error("Failed to add patient", { transition: Bounce });
      console.log(err);
    }finally{
      setLoading(false)
    }
  };

  return (
     <main className="flex-1 bg-[#F8F6FF] p-4 md:p-6 overflow-y-auto">
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange}/>
        <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
        <InputField label="Age" name="age" type="number" value={form.age} onChange={handleChange} />
        <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female"]} />
        <SelectField label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />

        <div className="sm:col-span-2">


        <Button
  type="submit"
  label="Add Patient"

  loading={loading}
  className="w-full !bg-purple-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-purple-700 transition-all border-none shadow-none"
/>

                  
        </div>
      </form>
    </div>
    </main>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
  required
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      title={label}
      className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
    />
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      required
      onChange={onChange}
      className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
      aria-label={label}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddPatient;
