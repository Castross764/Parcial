"use client";

import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  const logout = async () => {
    document.cookie = "access_token=; Max-Age=0"; // limpiar cookie rápido
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow">
      <h1 className="font-bold text-lg">Juan Sao Ville App</h1>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}