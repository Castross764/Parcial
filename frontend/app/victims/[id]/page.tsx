"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
import Card from "../../../components/ui/Card";

export default function VictimDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [victim, setVictim] = useState<any>(null);
  const [status, setStatus] = useState("");

  const fetchVictim = async () => {
    const res = await api.get(`/victims/${id}`);
    setVictim(res.data);
    setStatus(res.data.transformationStatus);
  };

  useEffect(() => {
    fetchVictim();
  }, [id]);

  const updateStatus = async () => {
    await api.put(`/victims/${id}`, { transformationStatus: status });
    fetchVictim();
  };

  if (!victim) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6 space-y-6">
      <Card title={`Víctima #${victim.id}`}>
        <p><b>Nombre:</b> {victim.name}</p>
        <p><b>Habilidades:</b> {victim.skills}</p>
        <p><b>Última vez visto:</b> {victim.lastSeen}</p>
        <p><b>Estado:</b> {victim.transformationStatus}</p>
      </Card>

      {(user?.role === "ADMIN" || user?.role === "SLAVE") && (
        <Card title="Actualizar Estado">
          <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded p-2">
            <option value="CAPTURED">CAPTURED</option>
            <option value="TRANSFORMING">TRANSFORMING</option>
            <option value="DATA_SCIENTIST">DATA_SCIENTIST</option>
          </select>
          <button onClick={updateStatus} className="ml-2 bg-blue-600 text-white px-4 py-1 rounded">Actualizar</button>
        </Card>
      )}
    </div>
  );
}