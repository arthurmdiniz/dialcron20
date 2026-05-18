![Preview do projeto](./img/DialcronSplash.png)

# Dialcron 2.0 - Projeto React

## Como executar este projeto

### 1. Pré-requisitos

* Node.js instalado (versão 16 ou superior)
* npm ou yarn
* Acesso ao banco de dados MySQL remoto (servidor E15)

### 2. Instalação

```bash
npm install
```

### 3. Executar o projeto

**Frontend (React + Vite):**
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:5173`

**Backend (Node.js + Express):**
```bash
cd server
npm install
npm start
```
O servidor API estará em `http://localhost:3001`

### 4. Build para produção

```bash
npm run build
```

---

## Estrutura do Projeto

```bash
src/
├── components/
│   ├── Menu/              ← Menu principal (barra superior)
│   ├── Documentacao20/    ← Documentação completa (guia passo a passo)
│   ├── Configuracao/      ← Conteúdo do menu Configuração
│   ├── Atendimento/       ← Cadastros (Médicos, Especialidades, Pacientes)
│   └── Sobre/             ← Informações sobre o projeto
├── styles/                ← Arquivos CSS
├── main.jsx               ← Entry point
├── App.jsx                ← Componente principal
├── index.css              ← Estilos globais
└── FundoInfinito.*        ← Background visual

server/
├── db.js                  ← Conexão MySQL (servidor E15)
├── index.js               ← Servidor Express (porta 3001)
├── package.json           ← Dependências do backend
└── routes/                ← Rotas da API
    ├── medicos.js
    ├── especialidades.js
    ├── usuarios.js
    ├── agenda.js
    └── ...
```

---

## Tecnologias

**Frontend:**
* React 18.2.0
* Vite 4.4.0
* React Calendar 6.0.1

**Backend:**
* Node.js
* Express 4.18.2
* MySQL2 3.9.0
* CORS 2.8.5

**Banco de Dados:**
* MySQL (remoto E15 - database: dialcron1)

**Dev Dependencies:**
* @types/react 18.2.0
* @vitejs/plugin-react 4.0.0
* nodemon 3.0.0

---

## Funcionalidades

1. **Agendamento** - Sistema de agendamento de consultas
2. **Cadastro de Médicos** - CRUD completo com seleção de especialidades
3. **Cadastro de Especialidades** - Gerenciamento de especialidades médicas
4. **Documentação** - Guia completo passo a passo (arquitetura, cadastros, modais, API, banco, paleta de cores, fluxo completo)
5. **Sobre** - Informações do projeto com tecnologias atualizadas

---

## Contato

**Desenvolvedor:** Arthur / Dialcron
**Repositório:** GitHub do projeto
**IA Utilizada:** OpenCode (big-pickle)
