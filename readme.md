# University.io

University.io é a conclusão do teste referente a vaga de BackEnd.

## Tecnlogias

- NodeJs
- MongoDB

## Instalação

1 - Clone & Install
```bash
git clone https://github.com/thethiago27/university.io
cd university.io

yarn

```

2 - Configurando as variáveis de ambiente

MONGO_URL: Sua URL de conexão para o MongoDB
MONGO_DB: Nome do banco de dados

3 - Configurando o MongoDB

-   Crie uma collection chamada "universities"

3 - Executando

```bash
yarn start

```

## Consultas

Sempre que for fazer uma requisição de método GET /universities é obrigatório passar o parametro "page" e indiciar a página que quer ver
Exemplo: http://localhost:3000/universities?page=1

Você pode fazer consultas também filtrando por país:

Exemplo: http://localhost:3000/universities?page=1&country=brazil

[POST] /universities - Cria uma nova universidade
[PUT] /universities/:id - Atualiza uma universidade por ID
[DELETE] /universities/:id - Deleta uma universidade por ID

