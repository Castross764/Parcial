"use client";

import { useState, useEffect } from "react";
import api from "../../../lib/api";
import Card from "../../../components/ui/Card";
import Table from "../../../components/ui/Table";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../DashboardLayout";

export default function SlaveDashboard() {
  const { user } = useAuth();
  const [victims, setVictims] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", skills: "", lastSeen: "", transformationStatus: "CAPTURED" });

  const fetchVictims = async () => {
    const res = await api.get("/victims");
    setVictims(res.data);
  };

  useEffect(() => {
    fetchVictims();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/victims", form);
    setForm({ name: "", skills: "", lastSeen: "", transformationStatus: "CAPTURED" });
    fetchVictims();
  };

  if (!user || user.role !== "SLAVE") return <p>No autorizado</p>;

  return (
    <DashboardLayout role={user.role}>
        <Card title="Capturar Nueva Víctima">
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Nombre"
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
            placeholder="Habilidades"
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
            value={form.lastSeen}
            onChange={e => setForm({ ...form, lastSeen: e.target.value })}
            placeholder="Última vez visto"
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-2xl shadow hover:from-indigo-600 hover:to-purple-600 transition-colors"
            >
            Capturar
            </button>
        </form>
        </Card>

      <Card title="Mis Víctimas">
        <Table
          headers={["ID", "Nombre", "Habilidades", "Última vez visto", "Estado"]}
          rows={victims.map(v => [v.id, v.name, v.skills, v.lastSeen, v.transformationStatus])}
        />
      </Card>
    </DashboardLayout>
  );
}