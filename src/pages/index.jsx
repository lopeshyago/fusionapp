import React from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Selecione seu perfil</h1>
        <p className="text-center text-sm text-gray-500">
          Escolha como deseja entrar para continuar.
        </p>
        <div className="grid gap-3">
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => navigate("/InstructorProfile")}
          >
            Entrar como Instrutor
          </button>
          <button
            className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            onClick={() => navigate("/StudentProfile")}
          >
            Entrar como Aluno
          </button>
          <button
            className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
            onClick={() => navigate("/AdminUsers")}
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    </div>
  );
}
