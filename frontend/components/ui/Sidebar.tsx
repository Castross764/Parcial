import Link from "next/link";

export default function Sidebar({ role }: { role: string }) {
  return (
    <aside className="w-64 bg-gray-100 h-full shadow p-4 space-y-4">
      {role === "ADMIN" && (
        <>
          <Link href="/dashboard/admin" className="block hover:underline">Usuarios</Link>
          <Link href="/dashboard/admin/leaderboard" className="block hover:underline">Leaderboard</Link>
        </>
      )}
      {role === "SLAVE" && (
        <>
          <Link href="/dashboard/slave" className="block hover:underline">Mis Víctimas</Link>
        </>
      )}
      <Link href="/resistance" className="block hover:underline">Resistencia</Link>
    </aside>
  );
}