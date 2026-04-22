# To-Do List

Aplicacao web de lista de tarefas criada com **HTML, CSS e JavaScript puro**. O projeto foi desenvolvido para praticar manipulacao do DOM, organizacao de estado, persistencia no navegador e recursos de PWA, com uma interface responsiva e simples de usar no dia a dia.

[![Status](https://img.shields.io/badge/status-concluido-1d6f5f?style=for-the-badge)](https://github.com/victorbernardo18-oss/todo-list)
[![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=222)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-0f172a?style=for-the-badge)](https://web.dev/progressive-web-apps/)

## Sobre o projeto

Este projeto simula uma ferramenta de organizacao pessoal, permitindo cadastrar, acompanhar e gerenciar tarefas diretamente no navegador. Os dados ficam salvos no `localStorage`, entao a lista continua disponivel mesmo depois de fechar a pagina.

O objetivo principal foi transformar uma To-Do List basica em uma aplicacao mais completa para portfolio, com recursos que demonstram dominio dos fundamentos de front-end.

## Link do projeto

Quando o GitHub Pages estiver ativo neste repositorio, o projeto podera ser acessado em:

[https://victorbernardo18-oss.github.io/todo-list/](https://victorbernardo18-oss.github.io/todo-list/)

## Funcionalidades

- Adicionar novas tarefas
- Editar tarefas existentes
- Remover tarefas individualmente
- Marcar tarefas como concluidas
- Definir prioridade baixa, media ou alta
- Buscar tarefas em tempo real
- Filtrar por todas, pendentes e concluidas
- Limpar tarefas concluidas
- Salvar dados no navegador com `localStorage`
- Exibir resumo com total, pendentes e concluidas
- Instalar como aplicativo no navegador
- Usar com suporte basico offline via Service Worker

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- DOM
- `localStorage`
- `Service Worker`
- `Web App Manifest`

## Aprendizados praticados

- Criacao de interfaces responsivas
- Manipulacao de elementos HTML com JavaScript
- Eventos de formulario, busca, filtros e botoes de acao
- Renderizacao dinamica de listas
- Organizacao de dados em arrays de objetos
- Persistencia de dados no navegador
- Estrutura inicial de Progressive Web App
- Separacao entre estrutura, estilo e comportamento

## Como executar localmente

1. Clone este repositorio:

```bash
git clone https://github.com/victorbernardo18-oss/todo-list.git
```

2. Acesse a pasta do projeto:

```bash
cd todo-list
```

3. Rode um servidor local:

```bash
python -m http.server 5500
```

4. Abra no navegador:

```text
http://localhost:5500
```

## Estrutura do projeto

```text
todo-list/
|-- icons/
|-- index.html
|-- manifest.json
|-- README.md
|-- script.js
|-- style.css
|-- sw.js
```

## Possiveis melhorias futuras

- Adicionar data limite para tarefas
- Criar modo escuro
- Permitir ordenacao por prioridade
- Substituir `alert` e `prompt` por modais personalizados
- Adicionar testes automatizados para as funcoes principais

## Autor

Desenvolvido por [Victor Bernardo](https://github.com/victorbernardo18-oss).

