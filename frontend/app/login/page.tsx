"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema)
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginForm) => {
    try {
      await api.post("/auth/login", data);
      router.push("/dashboard/admin"); // 🔹 más adelante redirigimos según rol
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl rounded-2xl p-8 w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        
            <input
            {...register("email")}
            placeholder="Email"
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <input
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-2xl shadow hover:from-indigo-600 hover:to-purple-600 transition-colors"
            >
            Entrar
            </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}