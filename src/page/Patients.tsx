import PatientsTable from "../components/PatientsTable";

  
const Patients = () =>{
  return (
    <main className="flex-1 bg-[#F8F6FF] p-4 md:p-6 overflow-y-auto">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-purple-700">Patient Table</h1>

        {/* TABLE */}
       <PatientsTable/>
      </div>
    </main>
  );
}

export default Patients;
