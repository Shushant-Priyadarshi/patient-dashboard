import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchPatientById,
  updatePatientById,
} from "../features/patients/patientAPI";
import { ToastContainer, toast,Bounce } from "react-toastify";
import { Button } from "primereact/button";

const UpdatePatient = () => {

  const { patientId } = useParams();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodGroup: "",
  });

  //load previous info of patient
  useEffect(() => {
    const loadPatient = async () => {
      if (!patientId) return;

      try {
        const data = await fetchPatientById(Number(patientId));
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          age: String(data.age),
          gender: data.gender,
          bloodGroup: data.bloodGroup || "",
        });
      } catch (err) {
        console.error("Failed to load patient:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [patientId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //submit method
  const handleSubmit = async(e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();

    const updatedData = {
      id: Number(patientId),
      firstName: form.firstName,
      lastName: form.lastName,
      age: Number(form.age),
      gender: form.gender,
      bloodGroup: form.bloodGroup,
    };


    try {
      const updatedPatient = await updatePatientById(
        Number(patientId),
        updatedData
      );
      toast.success("Patient Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log(updatedPatient);
      

    } catch (err) {
        console.log(err);
        toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }finally{
      setLoading(false)
    }
  };

  

  return (
    <main className="flex-1 bg-[#F8F6FF] p-4 md:p-6 overflow-y-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="p-4 max-w-3xl mx-auto bg-white rounded-xl shadow mt-10">
        <h1 className="text-2xl font-semibold mb-6 text-purple-700">
          Update Patient #{patientId}
        </h1>

        
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            <FormInput
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
            <FormInput
              label="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
              type="number"
            />
            <FormSelect
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={["Male", "Female"]}
            />
            <FormSelect
              label="Blood Group"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            />
          </div>


           <Button  type="submit" severity="help"  label="Submit"  className="w-full !bg-purple-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-purple-700 transition-all border-none shadow-none"  loading={loading}  />

        
        </form>
        
      </div>
    </main>
  );
};

const FormInput = ({
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
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      placeholder={`Enter ${label}`}
      title={label}
    />
  </div>
);

const FormSelect = ({
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
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
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

export default UpdatePatient;
