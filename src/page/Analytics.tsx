
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LoaderComponent from "../components/LoaderComponent";
import { useEffect } from "react";
import { fetchPatients } from "../features/patients/patientSlice";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const Analytics = () => {
  const dispatch = useAppDispatch()
  const {patients,loading,error} = useAppSelector(state => state.patients)

  useEffect(()=>{
    dispatch(fetchPatients())
  },[dispatch])

  const genderData = [
    {
      name: "Male",
      value: patients.filter((p) => p.gender.toLowerCase() === "male")
        .length,
    },
    {
      name: "Female",
      value: patients.filter((p) => p.gender.toLowerCase() === "female")
        .length,
    },
  ];

  const bloodGroupMap: { [key: string]: number } = {};
  patients.forEach((p) => {
    bloodGroupMap[p.bloodGroup] = (bloodGroupMap[p.bloodGroup] || 0) + 1;
  });
  const bloodGroupData = Object.keys(bloodGroupMap).map((bg) => ({
    name: bg,
    value: bloodGroupMap[bg],
  }));

  const ageData = patients.map((p) => ({ name: p.firstName, age: p.age }));

if(error) return <h1>{error}</h1>

  return (
    <main className="flex-1 bg-[#F8F6FF] p-4 md:p-6 overflow-y-auto">
      <div className="p-4 max-w-4xl mx-auto font-semibold text-purple-700 text-2xl">
        Analytics
      </div>

      {loading? <LoaderComponent/>:
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Gender Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-center mb-4 text-purple-700">
            Gender Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {genderData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Group Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-center mb-4 text-purple-700">
            Blood Group Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bloodGroupData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {bloodGroupData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-center mb-4 text-purple-700">
            Age of Patients (Line Chart)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="age"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
       }
    </main>
  );
};

export default Analytics;
