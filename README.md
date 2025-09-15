# backendInova

## Descrição

O **backendInova** é uma API RESTful desenvolvida com **Fastify** e **TypeScript**, destinada a gerenciar usuários e autenticação. O projeto utiliza **Prisma** como ORM para interação com o banco de dados e **bcryptjs** para criptografia de senhas. A autenticação é realizada por meio de **JSON Web Tokens (JWT)**.

---

## Tecnologias Utilizadas

-   **Fastify**: Framework web rápido e eficiente para Node.js.
-   **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
-   **Prisma**: ORM moderno e tipo seguro para Node.js.
-   **bcryptjs**: Biblioteca para criptografia de senhas.
-   **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT.
-   **Zod**: Biblioteca para validação de dados com TypeScript.

---

## Estrutura do Projeto

```
backendInova/
├── prisma/               # Arquivos de configuração do Prisma
├── src/                  # Código-fonte da aplicação
│   ├── controllers/      # Funções que manipulam as requisições HTTP
│   ├── routes/           # Definição das rotas da API
│   ├── services/         # Lógica de negócios e interação com o banco de dados
│   ├── schemas/          # Validações de entrada com Zod
│   └── lib/              # Utilitários e configurações auxiliares
├── .gitignore            # Arquivos e pastas a serem ignorados pelo Git
├── package.json          # Dependências e scripts do projeto
├── tsconfig.json         # Configurações do TypeScript
└── README.md             # Documentação do projeto
```

---

## Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Davibto/backendInova.git](https://github.com/Davibto/backendInova.git)
    cd backendInova
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
    ```env
    DATABASE_URL="sua_string_de_conexao_do_banco_de_dados"
    JWT_SECRET="seu_segredo_para_tokens_jwt"
    ```

4.  **Execute as migrações do Prisma:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Execute o seed do banco de dados para popular dados iniciais (opcional):**
    ```bash
    npx prisma db seed
    ```

6.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```
## Endpoints da API

### Autenticação

-   `POST /auth/login`: Realiza o login do usuário e retorna um token JWT.

### Usuários

-   `GET /users`: Lista todos os usuários.
-   `GET /users/:id`: Obtém os detalhes de um usuário específico.
-   `PUT /users/:id`: Atualiza os dados de um usuário.
-   `DELETE /users/:id`: Remove um usuário.
-   `PATCH /users/:id/password`: Atualiza a senha de um usuário.