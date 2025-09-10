"use client";

import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Table from "../../../components/ui/Table";
import Card from "../../../components/ui/Card";
import DashboardLayout from "../DashboardLayout";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      api.get("/users").then(res => setUsers(res.data));
    }
  }, [user]);

  if (!user) return <p>Cargando...</p>;

  return (
    <DashboardLayout role={user.role}>
      <h1 className="text-2xl font-bold mb-4">👑 Panel de Juan Sao Ville</h1>
      <Card title="Usuarios">
        <Table
          headers={["ID", "Email", "Rol"]}
          rows={users.map(u => [u.id, u.email, u.role])}
        />
      </Card>
    </DashboardLayout>
  );
}