import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function carregarTarefas() {
      const res = await api.get("/tasks");
      setTarefas(res.data);
    }
    carregarTarefas();
  }, []);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <button>Nova Tarefa</button>
      <ul>
        {tarefas.map((t) => (
          <li key={t._id}>{t.title} — {t.status}</li>
        ))}
      </ul>
    </div>
  );
}