Projeto Realizado com C# e React e SQLServer.

## Getting Started Backend

Para iniciar o backend, rode

1. dotnet clean
2. donet restore
3. dotnet build
4. dotnet run

## Frontend/

First, run the development server:

```bash
install ->

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Apos iniciar o projeto.

1. Entre no backend e faça um Post para: /api/User/AdicionarUsuario para Criar um usário
   {
   "id": 0,
   "email": "user@example.com",
   "password": "string"
   }

2. Com usuário criado, acesse a aplicação.

1.2 Para testar a criptografia JWT, entre na rota /api/auth/login
