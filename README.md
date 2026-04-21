# To-Do List

Aplicacao de lista de tarefas feita com HTML, CSS e JavaScript puro.

## Destaques

- Adicionar, editar e remover tarefas
- Marcar tarefas como concluidas
- Definir prioridade baixa, media ou alta
- Buscar tarefas em tempo real
- Filtrar por todas, pendentes ou concluidas
- Limpar tarefas concluidas com um clique
- Persistencia com `localStorage`
- Instalacao como aplicativo no navegador (PWA)
- Suporte basico offline com `service worker`

## Estrutura

- `index.html`: estrutura da interface
- `style.css`: visual e responsividade
- `script.js`: logica da aplicacao
- `manifest.json`: configuracao do app instalavel
- `sw.js`: cache offline

## Como executar

1. Baixe ou clone este repositorio.
2. Abra a pasta do projeto.
3. Inicie um servidor local simples.

Exemplo com Python:

```bash
python -m http.server 5500
```

Depois, abra `http://localhost:5500`.

## Publicacao no GitHub Pages

Para publicar como site:

1. Envie o projeto para o GitHub.
2. No repositorio, abra `Settings > Pages`.
3. Em `Build and deployment`, escolha a branch principal e a pasta raiz.
4. Salve e aguarde o link do site ser gerado.

## Objetivo

Projeto criado para praticar DOM, eventos, armazenamento local, organizacao de codigo e conceitos iniciais de Progressive Web App.
