import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
      

const App = () => {
  return (
    <div className="flex h-screen font-sans flex-col md:flex-row ">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default App;
