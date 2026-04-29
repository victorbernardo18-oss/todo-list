# Weather App

Aplicacao de clima desenvolvida com **HTML, CSS e JavaScript puro**, com busca por cidade, consulta a API de previsao e interface responsiva.

## Visao Geral

Este projeto foi criado para fortalecer portfolio frontend com um caso mais proximo de aplicacao real, incluindo consumo de API, tratamento de estados e apresentacao visual mais elaborada.

## Funcionalidades

- Buscar clima por cidade
- Consultar previsao atual
- Exibir sensacao termica, vento e umidade
- Mostrar previsao para os proximos dias
- Usar geolocalizacao do navegador
- Interface responsiva para desktop e celular

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Fetch API
- Geolocation API
- Open-Meteo API

## API Utilizada

Este projeto usa a API da Open-Meteo para:

- geocodificacao de cidades
- previsao do tempo atual
- previsao diaria

Fontes oficiais:

- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Weather Forecast API](https://open-meteo.com/en/docs)

## Como Executar

1. Abra a pasta do projeto.
2. Rode um servidor local simples:

```bash
python -m http.server 5500
```

3. Acesse no navegador:

```text
http://localhost:5500
```

## Estrutura

```text
weather-app/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
```

## Aprendizados Praticados

- Consumo de API com `fetch`
- Tratamento de erros de requisicao
- Manipulacao do DOM
- Renderizacao dinamica de dados
- Responsividade com CSS
- Integracao com geolocalizacao

## Melhorias Futuras

- Adicionar alternancia entre Celsius e Fahrenheit
- Mostrar icones personalizados por clima
- Salvar cidades recentes
- Publicar no GitHub Pages

## Autor

Desenvolvido por [Victor Bernardo](https://github.com/victorbernardo18-oss).
