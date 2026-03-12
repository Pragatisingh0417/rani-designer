import Link from "next/link";
import Sidebar from "./sidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
<Sidebar />
      {/* Right Content */}
      <main className="flex-1 p-10 bg-gray-100">
        {children}
      </main>

    </div>
  );
}