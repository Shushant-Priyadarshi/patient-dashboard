import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdSpaceDashboard, MdAnalytics } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaHospital } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
import { MdManageAccounts } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";

const SideBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const SidebarItem = ({ Icon, label }: { Icon: IconType; label: string }) => (
    <div className="flex items-center gap-2 text-purple-900 hover:text-purple-700 cursor-pointer text-sm">
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );

  // Wrapper that closes the sidebar on mobile link click
  const MobileLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} onClick={() => window.innerWidth < 768 && setMobileNavOpen(false)}>
      {children}
    </Link>
  );

  return (
    <div>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-[#E5DFFF] px-4 py-3">
        <Link to="/">
          <div className="text-2xl font-bold text-purple-900">
            <FaHospital />
          </div>
        </Link>
        <div
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="text-purple-900"
        >
          {mobileNavOpen ? <RxCross2 size={24} /> : <FiMenu size={24} />}
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileNavOpen ? "flex" : "hidden"
        } md:flex w-full md:w-60 bg-[#E5DFFF] p-4 flex-col justify-start space-y-8 md:space-y-10 z-10 md:z-auto`}
      >
        <Link
          to="/"
          className="hidden md:block text-3xl font-bold text-purple-900 mb-10"
        >
          <SidebarItem Icon={FaHospital} label="Shushi's Dashboard" />
        </Link>

        <nav className="flex flex-col gap-6">
          <MobileLink to="/">
            <SidebarItem Icon={MdSpaceDashboard} label="Dashboard" />
          </MobileLink>
          <MobileLink to="/analytics">
            <SidebarItem Icon={MdAnalytics} label="Analytics" />
          </MobileLink>
          <MobileLink to="/add-patient">
            <SidebarItem Icon={IoIosPersonAdd} label="Add Patient" />
          </MobileLink>
          <MobileLink to="/manage-patients">
            <SidebarItem Icon={MdManageAccounts} label="Manage Patients" />
          </MobileLink>

          {/* External link (don't auto-close sidebar) */}
          <a
            title="View project on GitHub"
            rel="noopener noreferrer"
            href="https://github.com/Shushant-Priyadarshi/patient-dashboard"
            target="_blank"
          >
            <SidebarItem Icon={IoLogoGithub} label="Github" />
          </a>

          <a
            title="View Portfolio"
            rel="noopener noreferrer"
            href="https://shushantpriyadarshi.me"
            target="_blank"
          ><SidebarItem Icon={IoMdContact} label="Contact" /></a>
          
        </nav>

        {/* Logout (you can make this a Link or button if needed) */}
        <SidebarItem Icon={IoIosLogOut} label="Logout" />
      </aside>
    </div>
  );
};

export default SideBar;
