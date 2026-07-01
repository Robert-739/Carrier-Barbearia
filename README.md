# Carrier Barbearia — Plataforma de Agendamento

> Plataforma web completa para barbearia com sistema de agendamento, clube de assinaturas e checkout integrado com Mercado Pago.

🔗 **Deploy:** [carrier-barbearia.vercel.app](https://carrier-barbearia.vercel.app)

---

## ✨ Funcionalidades

- **Agendamento online** — sistema de marcação de horários com seleção de serviço, barbeiro e data *(em desenvolvimento)*
- **Clube de assinaturas** — planos mensais com checkout transparente *(em desenvolvimento)*
- **Pagamentos integrados** — integração com Mercado Pago API *(em desenvolvimento)*
- **Banco de dados** — persistência com Supabase (PostgreSQL)
- **Design customizado** — identidade visual própria com tipografia forte e estética urbana
- **Totalmente responsivo** — adaptado para mobile, tablet e desktop

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| Next.js 14 | Framework principal e roteamento |
| React | Componentização da interface |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização utilitária |
| Supabase | Banco de dados e autenticação |
| Mercado Pago API | Processamento de pagamentos |

---

## 📁 Estrutura do Projeto

```
Carrier-Barbearia/
├── app/
│   ├── layout.tsx       # Metadata e configuração global
│   ├── page.tsx         # Página principal
│   └── globals.css      # Estilos globais
├── components/          # Componentes reutilizáveis
├── public/              # Assets e imagens
└── lib/                 # Configuração do Supabase e utilitários
```

---

## 🚀 Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/Robert-739/Carrier-Barbearia.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Preencha com suas credenciais do Supabase e Mercado Pago

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🔐 Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
MERCADOPAGO_ACCESS_TOKEN=
```

---

## 📌 Status do Projeto

| Funcionalidade | Status |
|---|---|
| Interface e design | ✅ Concluído |
| Responsividade | ✅ Concluído |
| Agendamento | 🔄 Em desenvolvimento |
| Pagamentos (Mercado Pago) | 🔄 Em desenvolvimento |
| Autenticação (Supabase) | 🔄 Em desenvolvimento |

---

Desenvolvido por [Robert Pereira](https://github.com/Robert-739)
