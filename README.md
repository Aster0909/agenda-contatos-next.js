# 📒 Agenda de Contatos

Este projeto é uma aplicação web criada com **Next.js** que permite cadastrar, visualizar, editar e remover contatos. Os dados são armazenados localmente em um arquivo `.json`.

## 🚀 Funcionalidades

- Adicionar novo contato
- Listar contatos
- Editar contato
- Excluir contato
- Estilização com Tailwind CSS
- Armazenamento em `contatos.json`

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- `uuid` para gerar IDs únicos
- `fs` para manipulação de arquivos no servidor

## 📂 Estrutura de Pastas

/app
├── page.tsx # Lista de contatos
├── new/page.tsx # Formulário de novo contato
└── edit/[id]/page.tsx # Formulário de edição

/api
└── contatos # Rotas de API (GET, POST, PUT, DELETE)

/data
└── contatos.json # Armazena os dados dos contatos

/lib
└── contatos.ts # Lógica de leitura, gravação e manipulação de contatos