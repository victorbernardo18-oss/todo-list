const STORAGE_KEY = "tarefas";

const prioridadeConfig = {
  baixa: { label: "Baixa", classe: "priority-low" },
  media: { label: "Media", classe: "priority-medium" },
  alta: { label: "Alta", classe: "priority-high" }
};

function criarId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function migrarTarefa(tarefa) {
  return {
    id: tarefa.id || criarId(),
    texto: (tarefa.texto || "").trim(),
    concluida: Boolean(tarefa.concluida),
    prioridade: prioridadeConfig[tarefa.prioridade] ? tarefa.prioridade : "media",
    criadaEm: tarefa.criadaEm || new Date().toISOString()
  };
}

let tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  .map(migrarTarefa)
  .filter((tarefa) => tarefa.texto !== "");

const elementos = {
  form: document.getElementById("form-tarefa"),
  inputTarefa: document.getElementById("tarefa"),
  selectPrioridade: document.getElementById("prioridade"),
  inputBusca: document.getElementById("busca"),
  lista: document.getElementById("lista"),
  contador: document.getElementById("contador"),
  limparConcluidas: document.getElementById("limpar-concluidas"),
  statTotal: document.getElementById("stat-total"),
  statPendentes: document.getElementById("stat-pendentes"),
  statConcluidas: document.getElementById("stat-concluidas"),
  statusApp: document.getElementById("status-app"),
  instalarApp: document.getElementById("instalar-app"),
  template: document.getElementById("template-tarefa"),
  botoesFiltro: Array.from(document.querySelectorAll(".filter-button"))
};

let filtroAtual = "todas";
let buscaAtual = "";
let eventoInstalacao = null;

function formatarData(isoString) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(isoString));
}

function salvar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

function atualizarStatusApp(mensagem = "") {
  elementos.statusApp.textContent = mensagem;
}

function atualizarResumo() {
  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = total - concluidas;

  elementos.statTotal.textContent = total;
  elementos.statPendentes.textContent = pendentes;
  elementos.statConcluidas.textContent = concluidas;
  elementos.contador.textContent = `${pendentes} pendente(s) de ${total} tarefa(s)`;
}

function aplicarFiltros(tarefa) {
  const atendeBusca = tarefa.texto.toLowerCase().includes(buscaAtual.toLowerCase());

  if (!atendeBusca) {
    return false;
  }

  if (filtroAtual === "pendentes") {
    return !tarefa.concluida;
  }

  if (filtroAtual === "concluidas") {
    return tarefa.concluida;
  }

  return true;
}

function atualizarEstadoFiltros() {
  elementos.botoesFiltro.forEach((botao) => {
    const ativo = botao.dataset.filter === filtroAtual;
    botao.classList.toggle("active", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
}

function criarMensagemVazia() {
  const item = document.createElement("li");
  item.className = "empty-state";
  item.textContent = buscaAtual
    ? "Nenhuma tarefa encontrada para essa busca."
    : "Sua lista esta vazia. Adicione a primeira tarefa para comecar.";
  return item;
}

function alternarConclusao(id) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
  );
  salvar();
  renderizarTarefas();
}

function removerTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  salvar();
  renderizarTarefas();
}

function editarTarefa(id) {
  const tarefa = tarefas.find((item) => item.id === id);

  if (!tarefa) {
    return;
  }

  const novoTexto = window.prompt("Edite a descricao da tarefa:", tarefa.texto);

  if (novoTexto === null) {
    return;
  }

  const textoNormalizado = novoTexto.trim();

  if (!textoNormalizado) {
    window.alert("A tarefa nao pode ficar vazia.");
    return;
  }

  const duplicada = tarefas.some(
    (item) =>
      item.id !== id && item.texto.toLowerCase() === textoNormalizado.toLowerCase()
  );

  if (duplicada) {
    window.alert("Ja existe uma tarefa com esse nome.");
    return;
  }

  tarefas = tarefas.map((item) =>
    item.id === id ? { ...item, texto: textoNormalizado } : item
  );

  salvar();
  renderizarTarefas();
}

function limparConcluidas() {
  const possuiConcluidas = tarefas.some((tarefa) => tarefa.concluida);

  if (!possuiConcluidas) {
    window.alert("Nao ha tarefas concluidas para remover.");
    return;
  }

  tarefas = tarefas.filter((tarefa) => !tarefa.concluida);
  salvar();
  renderizarTarefas();
}

function renderizarTarefas() {
  elementos.lista.innerHTML = "";
  atualizarResumo();
  atualizarEstadoFiltros();

  const tarefasFiltradas = tarefas.filter(aplicarFiltros);

  if (tarefasFiltradas.length === 0) {
    elementos.lista.appendChild(criarMensagemVazia());
    return;
  }

  tarefasFiltradas.forEach((tarefa) => {
    const fragmento = elementos.template.content.cloneNode(true);
    const item = fragmento.querySelector(".task-item");
    const botaoToggle = fragmento.querySelector(".task-toggle");
    const texto = fragmento.querySelector(".task-text");
    const prioridade = fragmento.querySelector(".task-priority");
    const meta = fragmento.querySelector(".task-meta");
    const botaoEditar = fragmento.querySelector(".edit-button");
    const botaoRemover = fragmento.querySelector(".delete-button");

    const prioridadeAtual = prioridadeConfig[tarefa.prioridade];

    item.dataset.id = tarefa.id;
    item.classList.toggle("is-done", tarefa.concluida);

    botaoToggle.classList.toggle("checked", tarefa.concluida);
    botaoToggle.setAttribute(
      "aria-label",
      tarefa.concluida ? "Marcar como pendente" : "Marcar como concluida"
    );

    texto.textContent = tarefa.texto;
    prioridade.textContent = prioridadeAtual.label;
    prioridade.classList.add(prioridadeAtual.classe);
    meta.textContent = `Criada em ${formatarData(tarefa.criadaEm)}`;

    botaoToggle.addEventListener("click", () => alternarConclusao(tarefa.id));
    botaoEditar.addEventListener("click", () => editarTarefa(tarefa.id));
    botaoRemover.addEventListener("click", () => removerTarefa(tarefa.id));

    elementos.lista.appendChild(fragmento);
  });
}

function atualizarVisibilidadeInstalacao() {
  elementos.instalarApp.hidden = !eventoInstalacao;
}

async function instalarAplicativo() {
  if (!eventoInstalacao) {
    atualizarStatusApp("A instalacao ainda nao esta disponivel neste navegador.");
    return;
  }

  eventoInstalacao.prompt();
  const escolha = await eventoInstalacao.userChoice;

  if (escolha.outcome === "accepted") {
    atualizarStatusApp("Aplicativo instalado com sucesso.");
  } else {
    atualizarStatusApp("Instalacao cancelada.");
  }

  eventoInstalacao = null;
  atualizarVisibilidadeInstalacao();
}

async function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    atualizarStatusApp("Este navegador nao suporta modo aplicativo offline.");
    return;
  }

  try {
    await navigator.serviceWorker.register("sw.js");
    atualizarStatusApp("Aplicativo pronto para instalacao e uso offline.");
  } catch (error) {
    atualizarStatusApp("Nao foi possivel ativar o modo offline.");
    console.error(error);
  }
}

function adicionarTarefa(event) {
  event.preventDefault();

  const texto = elementos.inputTarefa.value.trim();
  const prioridade = elementos.selectPrioridade.value;

  if (!texto) {
    window.alert("Digite uma tarefa antes de adicionar.");
    elementos.inputTarefa.focus();
    return;
  }

  const duplicada = tarefas.some(
    (tarefa) => tarefa.texto.toLowerCase() === texto.toLowerCase()
  );

  if (duplicada) {
    window.alert("Essa tarefa ja existe.");
    return;
  }

  tarefas.unshift({
    id: criarId(),
    texto,
    concluida: false,
    prioridade,
    criadaEm: new Date().toISOString()
  });

  salvar();
  renderizarTarefas();
  elementos.form.reset();
  elementos.selectPrioridade.value = "media";
  elementos.inputTarefa.focus();
}

elementos.form.addEventListener("submit", adicionarTarefa);

elementos.inputBusca.addEventListener("input", (event) => {
  buscaAtual = event.target.value.trim();
  renderizarTarefas();
});

elementos.botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filter;
    renderizarTarefas();
  });
});

elementos.limparConcluidas.addEventListener("click", limparConcluidas);
elementos.instalarApp.addEventListener("click", instalarAplicativo);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  eventoInstalacao = event;
  atualizarVisibilidadeInstalacao();
  atualizarStatusApp("Aplicativo disponivel para instalacao.");
});

window.addEventListener("appinstalled", () => {
  eventoInstalacao = null;
  atualizarVisibilidadeInstalacao();
  atualizarStatusApp("Aplicativo instalado com sucesso.");
});

salvar();
renderizarTarefas();
atualizarVisibilidadeInstalacao();
registrarServiceWorker();
