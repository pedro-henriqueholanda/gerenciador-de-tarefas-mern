import { useEffect, useState } from "react";
import api from "../services/api";
import TaskModal from "../components/TaskModal";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null); // null = criando nova
  const { logout } = useAuth();

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    setCarregando(true);
    try {
      const res = await api.get("/tasks");
      setTarefas(res.data);
    } catch (err) {
      setErro("Erro ao carregar tarefas");
    } finally {
      setCarregando(false);
    }
  }

  function abrirModalNovaTarefa() {
    setTarefaEditando(null);
    setModalAberto(true);
  }

  function abrirModalEdicao(tarefa) {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setTarefaEditando(null);
  }

  async function handleSalvar(dadosTarefa) {
    try {
      if (tarefaEditando) {
        // EDITAR (PUT)
        const res = await api.put(`/tasks/${tarefaEditando._id}`, dadosTarefa);
        setTarefas((prev) =>
          prev.map((t) => (t._id === tarefaEditando._id ? res.data : t))
        );
      } else {
        // CRIAR (POST)
        const res = await api.post("/tasks", dadosTarefa);
        setTarefas((prev) => [...prev, res.data]);
      }
      fecharModal();
    } catch (err) {
      setErro("Erro ao salvar tarefa");
    }
  }

  async function handleExcluir(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirmar) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTarefas((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setErro("Erro ao excluir tarefa");
    }
  }

  async function alternarStatus(tarefa) {
    const novoStatus = tarefa.status === "pendente" ? "concluída" : "pendente";
    try {
      const res = await api.put(`/tasks/${tarefa._id}`, { ...tarefa, status: novoStatus });
      setTarefas((prev) => prev.map((t) => (t._id === tarefa._id ? res.data : t)));
    } catch (err) {
      setErro("Erro ao atualizar status");
    }
  }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Minhas Tarefas</h2>
        <button onClick={logout}>Sair</button>
      </header>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <button onClick={abrirModalNovaTarefa}>+ Nova Tarefa</button>

      {carregando ? (
        <p>Carregando...</p>
      ) : tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada ainda.</p>
      ) : (
        <div style={{ marginTop: 16 }}>
          {tarefas.map((tarefa) => (
            <div
              key={tarefa._id}
              className={`task-card ${tarefa.status === "concluída" ? "concluida" : ""}`}
            >
              <div onClick={() => alternarStatus(tarefa)} style={{ cursor: "pointer", flex: 1 }}>
                <strong>{tarefa.title}</strong>
                <p>{tarefa.description}</p>
                <small>{tarefa.status}</small>
              </div>
              <div>
                <button onClick={() => abrirModalEdicao(tarefa)}>Editar</button>
                <button onClick={() => handleExcluir(tarefa._id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalAberto && (
        <TaskModal
          tarefa={tarefaEditando}
          onSalvar={handleSalvar}
          onFechar={fecharModal}
        />
      )}
    </div>
  );
}