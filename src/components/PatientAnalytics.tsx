import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchPatients } from "../features/patients/patientSlice";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#ffb6c1", "#00bcd4"];

const PatientAnalytics = () => {
  const dispatch = useAppDispatch();
  const { patients,  error } = useAppSelector((s) => s.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const genderData = [
    {
      name: "Male",
      value: patients.filter((p) => p.gender.toLowerCase() === "male").length,
    },
    {
      name: "Female",
      value: patients.filter((p) => p.gender.toLowerCase() === "female").length,
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

  if (error) return <h1 className="text-red-500 text-center">{error}</h1>;

  return (
    <div className="">

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blood Group Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bloodGroupData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {bloodGroupData.map((_, index) => (
                    <Cell
                      key={`cell-blood-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md">

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {genderData.map((_, index) => (
                    <Cell
                      key={`cell-gender-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientAnalytics;
