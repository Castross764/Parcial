import Sidebar from "../../components/ui/Sidebar";
import TopBar from "../../components/ui/TopBar";

export default function DashboardLayout({
  children,
  role
}: {
  children: React.ReactNode;
  role: string;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar />

        {/* Contenido de la página */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}