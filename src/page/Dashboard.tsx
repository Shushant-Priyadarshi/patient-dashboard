
import WelcomeCard from "../components/WelcomeCard";
import AnalyticsSection from "../components/AnalyticsSection";
import PatientAnalytics from "../components/PatientAnalytics";

const Dashboard = () => {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 bg-[#F8F6FF] p-4 md:p-6 overflow-y-auto">


        {/* Welcome Card */}
        <WelcomeCard />

        {/* Analytics Section */}
        <AnalyticsSection />

        {/* Activity & Process Section */}
        <PatientAnalytics />
      </main>
    </>
  );
};

export default Dashboard;
