const transacoes = []; 


const elementos = {
  form: document.getElementById("form-transacao"),
  descricao: document.getElementById("descricao"), 
  valor: document.getElementById("valor"),
  tipo: document.getElementById("valor"),
  lista: document.getElementById("lista"),
  totalEntradas: document.getElementById("total-entradas"),
  totalSaidas: document.getElementById("total-saidas"),
  saldoTotal: document.getElementById("saldo-total")
};

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-br", {
    style:"currency",
    currency:"BRL"
  }) .format(valor);
}

function atualizarResumo() {
  const entradas = transacoes
  .filter((transacao) => transacao.tipo === "entrada")
  .reduce((total,transacao) => total + transacao.valor,0);

  const saidas = transacoes
  .filter((transacao) => transacao.tipo === "saida")
  .reduce((total,transacao) => total + transacao.valor,0);

  const saldo = entradas - saidas; 

  elementos.totalEntradas.textContent = formatarMoeda(entradas);
  elementos.totalSaidas.textContent = formatarMoeda(saidas);
  elementos.saidaTotal.textContent = formatarMoeda(saldo);
}


function renderizarTransacoes() {
  elementos.lista.innerHTML = "";

  transacoes.forEach((transacao) => {
    const item = document.createElement("li");
    item.innerHTML = `
    <span>${transacao.descricao}</span>
    <strong>${formatarMoeda(transacao.valor)}</strong>
    `;
    elementos.lista.appendChild(item);
  });
}


elementos.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const descricao = elementos.descricao.value.trim();
  const valor = Number(elementos.valor.value);
  const tipo = elementos.tipo.value;

  if (!descricao || !valor) {
    alert("Preencha descricao e valor.");
    return;
  }

  transacoes.push({ descricao, valor, tipo });

  elementos.form.reset();
  atualizarResumo();
  renderizarTransacoes();
});

  



atualizarResumo();
