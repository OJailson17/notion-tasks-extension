# Notion Tasks Extension

![](/public/today-tasks.png)

Esta extensão utiliza a API do Notion para buscar os dados de uma página da aplicação, que está sendo usado como database.

Esta página é apenas um board que serve para controlar as tarefas que precisam ser feitas, que estão em andamento ou já foram concluídas.

A extensão busca apenas as tarefas que possuem a mesma data do dia da consulta ou tarefas de dias anteriores que possuem o status "OVERDUE".

Através da aplicação também é possível mudar o status da aplicação para "DONE", fazendo com que ela desapareça da lista.

Foi criado um servidor para realizar as chamadas para a API do Notion pois só é possível fazer requisições pelo servidor.

- [Repositório do servidor](https://github.com/OJailson17/notion-tasks-extension-server)

> **OBS**: Por conta de algumas limitações que a API do Notion traz devido as informações necessárias para usá-la, não faz sentido publicar esta extensão na Chrome Store, pois sua utilização seria muito trabalhosa.

## Tecnologias

- HTML
- CSS
- Typescript

---

> Para utilizá-la de forma local primeiro é necessário fazer o deploy do servidor ou rodá-lo de forma local, pois o API do Notion não aceita requisições pelo lado do cliente. O código do servidor está [nesse repositório](https://github.com/OJailson17/notion-tasks-extension-server).

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Deploy

Depois de conferir se aplicação tá funcionando corretamente, basta rodar o comando de deploy.

```bash
npm run deploy
```

Este comando irá criar uma pasta **/dist** na raiz do projeto, e **é esta pasta** que deve ser carregada no navegador.
Você pode conferir como adicionar extensões locais através [desse artigo](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/).
