const elementos = {
  form: document.getElementById("form-busca"),
  inputCidade: document.getElementById("cidade"),
  mensagemStatus: document.getElementById("mensagem-status"),
  resultadoClima: document.getElementById("resultado-clima"),
  usarLocalizacao: document.getElementById("usar-localizacao"),
  localizacao: document.getElementById("localizacao"),
  descricaoTempo: document.getElementById("descricao-tempo"),
  temperaturaAtual: document.getElementById("temperatura-atual"),
  iconeTempo: document.getElementById("icone-tempo"),
  sensacaoTermica: document.getElementById("sensacao-termica"),
  vento: document.getElementById("vento"),
  umidade: document.getElementById("umidade"),
  horarioLocal: document.getElementById("horario-local"),
  resumoForecast: document.getElementById("resumo-forecast"),
  listaPrevisao: document.getElementById("lista-previsao")
};

const traducaoClima = {
  0: { descricao: "Ceu limpo", icone: "☀️" },
  1: { descricao: "Predominantemente limpo", icone: "🌤️" },
  2: { descricao: "Parcialmente nublado", icone: "⛅" },
  3: { descricao: "Nublado", icone: "☁️" },
  45: { descricao: "Nevoeiro", icone: "🌫️" },
  48: { descricao: "Nevoeiro com geada", icone: "🌫️" },
  51: { descricao: "Garoa fraca", icone: "🌦️" },
  53: { descricao: "Garoa moderada", icone: "🌦️" },
  55: { descricao: "Garoa intensa", icone: "🌧️" },
  56: { descricao: "Garoa gelada fraca", icone: "🌧️" },
  57: { descricao: "Garoa gelada intensa", icone: "🌧️" },
  61: { descricao: "Chuva fraca", icone: "🌦️" },
  63: { descricao: "Chuva moderada", icone: "🌧️" },
  65: { descricao: "Chuva forte", icone: "🌧️" },
  66: { descricao: "Chuva gelada fraca", icone: "🌧️" },
  67: { descricao: "Chuva gelada forte", icone: "🌧️" },
  71: { descricao: "Neve fraca", icone: "🌨️" },
  73: { descricao: "Neve moderada", icone: "🌨️" },
  75: { descricao: "Neve forte", icone: "❄️" },
  77: { descricao: "Graos de neve", icone: "❄️" },
  80: { descricao: "Pancadas fracas", icone: "🌦️" },
  81: { descricao: "Pancadas moderadas", icone: "🌧️" },
  82: { descricao: "Pancadas fortes", icone: "⛈️" },
  85: { descricao: "Nevando fraco", icone: "🌨️" },
  86: { descricao: "Nevando forte", icone: "❄️" },
  95: { descricao: "Trovoadas", icone: "⛈️" },
  96: { descricao: "Trovoadas com granizo fraco", icone: "⛈️" },
  99: { descricao: "Trovoadas com granizo forte", icone: "⛈️" }
};

function definirStatus(mensagem, mostrarResultado = false) {
  elementos.mensagemStatus.textContent = mensagem;
  elementos.resultadoClima.classList.toggle("hidden", !mostrarResultado);
}

function obterDescricaoClima(codigo) {
  return traducaoClima[codigo] || { descricao: "Clima indisponivel", icone: "🌍" };
}

function formatarTemperatura(valor) {
  return `${Math.round(valor)}°C`;
}

function formatarVento(valor) {
  return `${Math.round(valor)} km/h`;
}

function formatarData(isoString, timezone, opcoes) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    ...opcoes
  }).format(new Date(isoString));
}

async function buscarCidade(termo) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", termo);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "pt");
  url.searchParams.set("format", "json");

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Nao foi possivel buscar a cidade.");
  }

  const dados = await resposta.json();

  if (!dados.results || dados.results.length === 0) {
    throw new Error("Nenhuma cidade encontrada com esse nome.");
  }

  return dados.results[0];
}

async function buscarClima(latitude, longitude, timezone = "auto") {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day"
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
  );
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("forecast_days", "5");

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Nao foi possivel consultar o clima agora.");
  }

  return resposta.json();
}

function renderizarPrevisao(daily, timezone) {
  elementos.listaPrevisao.innerHTML = "";

  daily.time.forEach((dia, indice) => {
    const clima = obterDescricaoClima(daily.weather_code[indice]);
    const cartao = document.createElement("article");
    cartao.className = "forecast-card";

    const nomeDia = formatarData(dia, timezone, { weekday: "short" });
    const dataCompleta = formatarData(dia, timezone, { day: "2-digit", month: "2-digit" });

    cartao.innerHTML = `
      <p class="forecast-day">${nomeDia}, ${dataCompleta}</p>
      <div class="forecast-icon" aria-hidden="true">${clima.icone}</div>
      <p class="forecast-condition">${clima.descricao}</p>
      <p class="forecast-temp">${Math.round(daily.temperature_2m_max[indice])}° / ${Math.round(daily.temperature_2m_min[indice])}°</p>
      <p class="forecast-extra">Chuva: ${daily.precipitation_probability_max[indice]}%</p>
    `;

    elementos.listaPrevisao.appendChild(cartao);
  });
}

function montarNomeLocal(cidade) {
  return [cidade.name, cidade.admin1, cidade.country].filter(Boolean).join(", ");
}

function renderizarClima(local, clima) {
  const dadosAtuais = clima.current;
  const dadosDiarios = clima.daily;
  const climaAtual = obterDescricaoClima(dadosAtuais.weather_code);

  elementos.localizacao.textContent = local.nomeExibicao;
  elementos.descricaoTempo.textContent = climaAtual.descricao;
  elementos.temperaturaAtual.textContent = formatarTemperatura(dadosAtuais.temperature_2m);
  elementos.iconeTempo.textContent = climaAtual.icone;
  elementos.sensacaoTermica.textContent = formatarTemperatura(dadosAtuais.apparent_temperature);
  elementos.vento.textContent = formatarVento(dadosAtuais.wind_speed_10m);
  elementos.umidade.textContent = `${dadosAtuais.relative_humidity_2m}%`;
  elementos.horarioLocal.textContent = formatarData(dadosAtuais.time, clima.timezone, {
    hour: "2-digit",
    minute: "2-digit"
  });

  elementos.resumoForecast.textContent = `Min ${Math.round(dadosDiarios.temperature_2m_min[0])}° | Max ${Math.round(dadosDiarios.temperature_2m_max[0])}° hoje`;

  renderizarPrevisao(dadosDiarios, clima.timezone);
  definirStatus("Clima carregado com sucesso.", true);
}

async function carregarPorCidade(nomeCidade) {
  definirStatus("Buscando cidade...");

  try {
    const cidade = await buscarCidade(nomeCidade);
    const clima = await buscarClima(cidade.latitude, cidade.longitude, cidade.timezone);

    renderizarClima(
      {
        nomeExibicao: montarNomeLocal(cidade)
      },
      clima
    );
  } catch (erro) {
    definirStatus(erro.message);
  }
}

async function carregarPorCoordenadas(latitude, longitude) {
  definirStatus("Buscando clima da sua localizacao...");

  try {
    const clima = await buscarClima(latitude, longitude, "auto");
    const nomeExibicao = `Sua localizacao (${Math.abs(latitude).toFixed(2)}°, ${Math.abs(longitude).toFixed(2)}°)`;

    renderizarClima({ nomeExibicao }, clima);
  } catch (erro) {
    definirStatus("Nao foi possivel carregar o clima da sua localizacao.");
  }
}

function usarMinhaLocalizacao() {
  if (!("geolocation" in navigator)) {
    definirStatus("Seu navegador nao suporta geolocalizacao.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (posicao) => {
      carregarPorCoordenadas(posicao.coords.latitude, posicao.coords.longitude);
    },
    () => {
      definirStatus("Nao foi possivel acessar sua localizacao.");
    }
  );
}

elementos.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomeCidade = elementos.inputCidade.value.trim();

  if (!nomeCidade) {
    definirStatus("Digite o nome de uma cidade para buscar.");
    elementos.inputCidade.focus();
    return;
  }

  carregarPorCidade(nomeCidade);
});

elementos.usarLocalizacao.addEventListener("click", usarMinhaLocalizacao);

carregarPorCidade("Sao Paulo");
