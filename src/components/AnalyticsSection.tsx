
import AnalyticsCard from './AnalyticsCard'
import { MdHealthAndSafety } from "react-icons/md";
import { FaCalendarCheck, FaUsers } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchPatients } from '../features/patients/patientSlice';
import LoaderComponent from './LoaderComponent';

const AnalyticsSection = () => {
  const[males,setMales] = useState<number>(0) 
  const[females,setFemales] = useState<number>(0) 
  const dispatch = useAppDispatch()
  const {patients,loading,error} = useAppSelector(s => s.patients)

  
  useEffect(()=>{
    dispatch(fetchPatients())
  },[dispatch])

   useEffect(() => {
    const maleCount = patients.filter((patient) => patient?.gender.toLowerCase() === "male").length;
    const femaleCount = patients.filter((patient) => patient?.gender.toLowerCase() === "female").length;
    setMales(maleCount);
    setFemales(femaleCount);
  }, [patients]);
 
  
  
if(error) return <h1>{error}</h1>

  return (
    <div>
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Patient Analytics</h3>
          {loading? <LoaderComponent/>: 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnalyticsCard
              icon={<FaCalendarCheck size={24} />}
              title="Total Males"
              data={`${males}`}
            />
            <AnalyticsCard
              icon={<MdHealthAndSafety size={24} />}
              title="Total Females"
              data={`${females}`}
            />
            <AnalyticsCard
              icon={<FaUsers size={24} />}
              title="Total Patients"
              data={patients.length.toString()}
            />
          </div>
          }
        </section>
    </div>
  )
}

export default AnalyticsSection