"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Card from "../../components/ui/Card";

export default function ResistancePage() {
  const [tips, setTips] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/public/tips").then(res => setTips(res.data));
  }, []);

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/public/feedback", { text: feedback });
    setMsg("✅ Feedback enviado");
    setFeedback("");
  };

  return (
    <div className="p-6 space-y-6">
      <Card title="Consejos para Resistir">
        <ul className="list-disc pl-6 space-y-1">
          {tips.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </Card>

        <Card title="Deja tu Feedback">
        <form onSubmit={submitFeedback} className="space-y-4">
            <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Tu mensaje..."
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-2xl shadow hover:from-green-600 hover:to-green-700 transition-colors"
            >
            Enviar
            </button>
        </form>
        {msg && <p className="text-green-600 mt-2">{msg}</p>}
        </Card>
    </div>
  );
}