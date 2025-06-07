import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchPatients } from "../features/patients/patientSlice";
import LoaderComponent from "./LoaderComponent";
import { Link } from "react-router-dom";
import { deletePatientById } from "../features/patients/patientAPI";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { confirmDialog } from "primereact/confirmdialog"; // For confirmDialog method
import { Button } from "primereact/button";

const PatientsTable = () => {
  const dispatch = useAppDispatch();
  const { patients, loading, error } = useAppSelector(
    (state) => state.patients
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"gender" | "age" | "">("");

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const filteredAndSortedPatients = useMemo(() => {
    let data = [...patients];

    if (searchTerm) {
      data = data.filter((p) =>
        p.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "gender") {
      data.sort((a, b) => a.gender.localeCompare(b.gender));
    } else if (sortBy === "age") {
      data.sort((a, b) => a.age - b.age);
    }

    return data;
  }, [patients, searchTerm, sortBy]);

  const handleSortByGender = () => setSortBy("gender");
  const handleSortByAge = () => setSortBy("age");

  const confirmDeletion = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this patient?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => handleDelete(id),
      reject: () => toast.info("Deletion cancelled"),
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const deletedResponse = await deletePatientById(Number(id));
      toast.success("Patient Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log(deletedResponse);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 space-y-4">
      <ConfirmDialog />
      <ToastContainer />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-4 py-2 rounded-md shadow-sm w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleSortByGender}
          >
            Sort by Gender
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSortByAge}
          >
            Sort by Age
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <LoaderComponent />
        ) : (
          <table className="min-w-full border border-gray-200 rounded-md overflow-hidden shadow-sm">
            <thead className="bg-[#E5DFFE] text-purple-900">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">{`${patient.firstName} ${patient.lastName}`}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {patient.bloodGroup}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 space-x-2">
                    {/* <Link
                      to={`/update-patient/${patient.id}`}
                      className="text-blue-600 hover:underline pointer-cursor"
                    >
                      Update
                    </Link> */}

                     <Link to={`/update-patient/${patient.id}`}><Button
                      label="Update"
 
                      className="p-button-text p-button-primary "
                      onClick={() => confirmDeletion(patient.id)}
                    /></Link>
                    {/* <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:underline  pointer-cursor">
                    Delete
                  </button> */}

                    <Button
                      label="Delete"
    
                      className="p-button-text p-button-danger"
                      onClick={() => confirmDeletion(patient.id)}
                    />
                  </td>
                </tr>
              ))}
              {filteredAndSortedPatients.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientsTable;
