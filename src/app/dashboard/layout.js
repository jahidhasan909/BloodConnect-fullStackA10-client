
import DashboardSidebar from "@/Components/dashboardComponents/Sidebar/sidebar";







export default function DashboardLayout({ children }) {
  return (
   <div className="flex">
    <DashboardSidebar></DashboardSidebar>
    <main className="grow">{children}</main>
   </div>
  );
}
