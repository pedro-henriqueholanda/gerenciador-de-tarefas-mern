import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionCard from "../components/TransactionCard";
import ConfirmDialog from "../components/ConfirmDialog";
import SkeletonList from "../components/SkeletonList";
import TransactionFormModal from "../components/TransactionFormModal";
import {
  atualizar,
  criar,
  excluir,
  listar,
  modoDemonstracao,
} from "../services/transactionService";
import { formatarMoeda, mensagemDeErro } from "../utils/format";

const TITULOS = {
  todas: "Todas as transações",
  entradas: "Entradas",
  saidas: "Saídas",
};

const TIPO_DO_FILTRO = { entradas: "entrada", saidas: "saida" };

function ordenarPorData(lista) {
  return [...lista].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function lancamentos(quantidade) {
  return `${quantidade} ${quantidade === 1 ? "lançamento" : "lançamentos"}`;
}

export default function Dashboard() {
  const { logout } = useAuth();
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const [erroAcao, setErroAcao] = useState("");
  const [paraExcluir, setParaExcluir] = useState(null);
  const [excluindo, setExcluindo] = useState(false);
  const [filtro, setFiltro] = useState("todas");
  const [busca, setBusca] = useState("");
  // modal: null = fechado | { transacao: null } = nova | { transacao } = edição
  const [modal, setModal] = useState(null);

  // "carregando" já nasce true; o efeito só atualiza estado quando a API responde.
  // O sinal "cancelado" evita atualizar o estado se a tela for fechada no meio da busca.
  useEffect(() => {
    let cancelado = false;

    listar()
      .then((lista) => {
        if (!cancelado) setTransacoes(ordenarPorData(lista));
      })
      .catch((err) => {
        if (!cancelado) {
          setErroLista(mensagemDeErro(err, "Não foi possível carregar as transações."));
        }
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  function tentarNovamente() {
    setCarregando(true);
    setErroLista("");
    setTentativa((n) => n + 1);
  }

  // Soma em centavos para evitar erros de ponto flutuante (0,1 + 0,2).
  const totais = useMemo(() => {
    let entradas = 0;
    let saidas = 0;
    for (const transacao of transacoes) {
      const centavos = Math.round(transacao.value * 100);
      if (transacao.type === "entrada") entradas += centavos;
      else saidas += centavos;
    }
    return {
      entradas: entradas / 100,
      saidas: saidas / 100,
      saldo: (entradas - saidas) / 100,
    };
  }, [transacoes]);

  const contagens = useMemo(() => {
    const entradas = transacoes.filter((t) => t.type === "entrada").length;
    return {
      todas: transacoes.length,
      entradas,
      saidas: transacoes.length - entradas,
    };
  }, [transacoes]);

  const transacoesFiltradas = useMemo(() => {
    const termo = busca.toLocaleLowerCase("pt-BR");
    return transacoes.filter((transacao) => {
      const correspondeTipo =
        filtro === "todas" || transacao.type === TIPO_DO_FILTRO[filtro];
      const texto = `${transacao.category} ${transacao.description ?? ""}`;
      const correspondeBusca = texto.toLocaleLowerCase("pt-BR").includes(termo);
      return correspondeTipo && correspondeBusca;
    });
  }, [transacoes, filtro, busca]);

  // Lança erro em caso de falha: o modal captura, mostra a mensagem e continua aberto.
  async function salvarTransacao(dados) {
    if (modal.transacao) {
      const atualizada = await atualizar(modal.transacao._id, dados);
      setTransacoes((atuais) =>
        ordenarPorData(atuais.map((t) => (t._id === atualizada._id ? atualizada : t))),
      );
    } else {
      const nova = await criar(dados);
      setTransacoes((atuais) => ordenarPorData([nova, ...atuais]));
    }
    setErroAcao("");
    setModal(null);
  }

  async function confirmarExclusao() {
    const transacao = paraExcluir;
    setExcluindo(true);
    try {
      await excluir(transacao._id);
      setTransacoes((atuais) => atuais.filter((t) => t._id !== transacao._id));
      setErroAcao("");
    } catch (err) {
      setErroAcao(mensagemDeErro(err, "Não foi possível excluir a transação."));
    } finally {
      setExcluindo(false);
      setParaExcluir(null);
    }
  }

  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
  const dataIso = [
    dataAtual.getFullYear(),
    String(dataAtual.getMonth() + 1).padStart(2, "0"),
    String(dataAtual.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <div className="app-shell">
      <Sidebar filtro={filtro} onFiltrar={setFiltro} contagens={contagens} />

      <main className="main-content">
        <Header
          busca={busca}
          onBuscar={setBusca}
          onNovaTransacao={() => setModal({ transacao: null })}
          onSair={logout}
          modoDemonstracao={modoDemonstracao}
        />

        <section className="welcome-section" aria-labelledby="welcome-title">
          <div>
            <p className="eyebrow">
              <time dateTime={dataIso}>{dataFormatada}</time>
            </p>
            <h1 id="welcome-title">
              Suas finanças, <span>sob controle.</span>
            </h1>
            <p className="welcome-copy">
              Acompanhe entradas e saídas e mantenha o saldo no azul.
            </p>
          </div>
          <div className="welcome-mark" aria-hidden="true">
            ✦
          </div>
        </section>

        <section className="stats-grid" aria-label="Resumo financeiro">
          <StatCard
            label="Saldo atual"
            value={formatarMoeda(totais.saldo)}
            detail="Entradas menos saídas"
            icon="◈"
            tone="purple"
          />
          <StatCard
            label="Entradas"
            value={formatarMoeda(totais.entradas)}
            detail={lancamentos(contagens.entradas)}
            icon="↙"
            tone="green"
          />
          <StatCard
            label="Saídas"
            value={formatarMoeda(totais.saidas)}
            detail={lancamentos(contagens.saidas)}
            icon="↗"
            tone="red"
          />
          <StatCard
            label="Transações"
            value={contagens.todas}
            detail="Registradas na sua conta"
            icon="▤"
            tone="orange"
          />
        </section>

        <section className="tasks-section" aria-labelledby="tasks-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SEU FLUXO DE CAIXA</p>
              <h2 id="tasks-title">{TITULOS[filtro]}</h2>
            </div>
            <span className="task-count" aria-live="polite">
              {transacoesFiltradas.length}{" "}
              {transacoesFiltradas.length === 1 ? "transação" : "transações"}
            </span>
          </div>

          {erroAcao && (
            <div className="alert-banner" role="alert">
              <span>{erroAcao}</span>
              <button
                type="button"
                onClick={() => setErroAcao("")}
                aria-label="Dispensar aviso"
              >
                ×
              </button>
            </div>
          )}

          {carregando ? (
            <SkeletonList />
          ) : erroLista ? (
            <div className="empty-state" role="alert">
              <span aria-hidden="true">!</span>
              <h3>Não foi possível carregar</h3>
              <p>{erroLista}</p>
              <button type="button" className="button button-primary" onClick={tentarNovamente}>
                Tentar novamente
              </button>
            </div>
          ) : transacoesFiltradas.length > 0 ? (
            <div className="task-list">
              {transacoesFiltradas.map((transacao) => (
                <TransactionCard
                  key={transacao._id}
                  transacao={transacao}
                  onEditar={(t) => setModal({ transacao: t })}
                  onExcluir={setParaExcluir}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <span aria-hidden="true">✧</span>
              <h3>Nenhuma transação encontrada</h3>
              <p>
                {contagens.todas === 0
                  ? "Registre sua primeira entrada ou saída."
                  : "Tente alterar o filtro ou a busca, ou registre uma nova transação."}
              </p>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setModal({ transacao: null })}
              >
                Nova transação
              </button>
            </div>
          )}
        </section>

        <footer className="page-footer">
          Feito para manter suas finanças em dia <span>✦</span>
        </footer>
      </main>

      {modal && (
        <TransactionFormModal
          transacao={modal.transacao}
          onFechar={() => setModal(null)}
          onSalvar={salvarTransacao}
        />
      )}

      {paraExcluir && (
        <ConfirmDialog
          titulo="Excluir transação?"
          mensagem={`"${paraExcluir.category}" de ${formatarMoeda(paraExcluir.value)} será removida permanentemente.`}
          textoConfirmar="Excluir"
          perigo
          ocupado={excluindo}
          onConfirmar={confirmarExclusao}
          onCancelar={() => setParaExcluir(null)}
        />
      )}
    </div>
  );
}
