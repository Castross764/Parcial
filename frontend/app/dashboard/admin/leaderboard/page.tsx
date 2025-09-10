"use client";

import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import Card from "../../../../components/ui/Card";
import Table from "../../../../components/ui/Table";
import { useAuth } from "../../../../context/AuthContext";
import DashboardLayout from "../../DashboardLayout";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [slaves, setSlaves] = useState<any[]>([]);

  useEffect(() => {
    api.get("/stats/leaderboard").then(res => setSlaves(res.data));
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <DashboardLayout role={user.role}>
      <Card title="Leaderboard de Slaves">
        <Table
          headers={["ID", "Nombre", "Víctimas capturadas"]}
          rows={slaves.map(s => [s.id, s.name, s._count.victims])}
        />
      </Card>
    </DashboardLayout>
  );
}