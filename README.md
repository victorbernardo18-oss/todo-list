# To-Do List

Aplicacao de lista de tarefas desenvolvida com **HTML, CSS e JavaScript puro**, com foco em organizacao pessoal, boa experiencia visual e recursos modernos como instalacao no navegador e suporte offline.

[![Status](https://img.shields.io/badge/status-concluido-1d6f5f?style=for-the-badge)](https://github.com/victorbernardo18-oss/todo-list)
[![Feito com](https://img.shields.io/badge/feito%20com-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=222)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/app-PWA-0f172a?style=for-the-badge)](https://web.dev/progressive-web-apps/)

## Preview

Projeto criado para ajudar no gerenciamento de tarefas do dia a dia, permitindo adicionar, editar, remover, filtrar e buscar tarefas com persistencia no navegador.

## Funcionalidades

- Adicionar novas tarefas
- Editar tarefas existentes
- Remover tarefas individualmente
- Marcar tarefas como concluidas
- Definir prioridade baixa, media ou alta
- Buscar tarefas em tempo real
- Filtrar por `todas`, `pendentes` e `concluidas`
- Limpar todas as tarefas concluidas com um clique
- Salvar dados no `localStorage`
- Instalar como aplicativo no navegador
- Usar o app com suporte basico offline

## Tecnologias

- HTML5
- CSS3
- JavaScript
- `localStorage`
- `Service Worker`
- `Web App Manifest`

## Diferenciais Do Projeto

- Interface moderna e responsiva
- Estrutura organizada em arquivos simples e faceis de estudar
- Evolucao de uma To-Do List basica para uma aplicacao mais completa
- Boa base para portfolio de frontend iniciante/intermediario

## Como Executar Localmente

1. Clone este repositorio:

```bash
git clone https://github.com/victorbernardo18-oss/todo-list.git
```

2. Entre na pasta do projeto:

```bash
cd todo-list
```

3. Rode um servidor local simples:

```bash
python -m http.server 5500
```

4. Abra no navegador:

```text
http://localhost:5500
```

## Publicacao Online

Quando o GitHub Pages estiver ativo neste repositorio, o projeto podera ser acessado em:

[https://victorbernardo18-oss.github.io/todo-list/](https://victorbernardo18-oss.github.io/todo-list/)

## Estrutura Do Projeto

```text
todo-list/
|-- index.html
|-- style.css
|-- script.js
|-- manifest.json
|-- sw.js
|-- icons/
```

## Aprendizados Praticados

- Manipulacao do DOM
- Eventos com JavaScript
- Armazenamento local no navegador
- Organizacao de estado da aplicacao
- Responsividade com CSS
- Conceitos iniciais de PWA

## Melhorias Futuras

- Adicionar data limite para tarefas
- Criar modo escuro
- Permitir ordenacao por prioridade
- Adicionar confirmacao visual mais elegante no lugar de `alert` e `prompt`

## Autor

Desenvolvido por [Victor Bernardo](https://github.com/victorbernardo18-oss).
