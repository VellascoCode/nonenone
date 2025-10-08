# Wonderland Trading Control Center
Painel Next.js (TypeScript + Tailwind CSS) inspirado em *Alice no País das Maravilhas* para acompanhar o Wonderland Trading Bot. O projeto integra **APIs gratuitas** (CoinGecko e CryptoCompare), oferece **simuladores quantitativos** (Martingale e Monte Carlo), persiste cenários em um **banco de dados SQLite** via Prisma e está preparado para push em provedores gratuitos (Vercel, Railway, etc.).

## ✨ Principais Funcionalidades

- **Dashboard temático** com métricas globais do CoinGecko e cards interativos.
- **Panorama de mercado** em tempo real (CoinGecko Markets).
- **Feed de notícias** usando CryptoCompare News API (sem chave).
- **Simulador Martingale** para a estratégia do “Chapeleiro Maluco”.
- **Simulação Monte Carlo** para avaliar risco/retorno dos alertas.
- **Gestor de Cenários**: CRUD simples persistido em SQLite com Prisma.
- **Pronto para Supabase**: cliente já configurado para notificações/streaming.
- **Testes unitários** (Vitest) para garantir confiabilidade dos simuladores.

## 🏗️ Stack Técnica

- [Next.js 14 (App Router)](https://nextjs.org/docs/app) com TypeScript.
- [Tailwind CSS 3](https://tailwindcss.com/) e estética glassmorphism dark.
- [Prisma ORM](https://www.prisma.io/) com SQLite (grátis por padrão).
- Integrações com APIs públicas (CoinGecko & CryptoCompare) e Supabase SDK.
- Testes com [Vitest](https://vitest.dev/) + Testing Library.

## 🚀 Como rodar localmente

> **Observação**: os comandos abaixo exigem acesso ao registry npm. Caso seu ambiente esteja offline, realize o `npm install` em outra máquina ou utilize um cache local.

```bash
# 1. Instale as dependências
npm install

# 2. Configure o banco de dados SQLite
echo "DATABASE_URL=\"file:./prisma/dev.db\"" > .env
npm run prisma:push
npm run prisma:seed

# 3. (Opcional) Informe as chaves do Supabase
echo "NEXT_PUBLIC_SUPABASE_URL=..." >> .env
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=..." >> .env

# 4. Suba o ambiente de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## 🧪 Testes e Qualidade

```bash
# Executar toda a suíte de testes unitários
npm run test

# Rodar em modo watch para TDD
npm run test:watch

# Analisar padrões com ESLint
npm run lint
```

## 📦 Estrutura de Pastas

```
app/                # App Router (layout, page e APIs)
components/         # Componentes React (dashboard, simuladores, etc.)
lib/                # Utilidades, Prisma Client e simuladores
prisma/             # Schema, seeds e banco SQLite
tests/              # Testes unitários com Vitest
```

## 🔌 Integrações Gratuitas

- **CoinGecko API** — preços, volume e métricas globais (sem chave).
- **CryptoCompare News API** — feed de notícias PT/EN (sem chave).
- **SQLite** — banco de dados local via Prisma, perfeito para POCs.
- **Supabase** — cliente pronto para habilitar funcionalidades em tempo real.

## 📚 Próximos Passos Sugeridos

- Conectar Supabase Realtime para transmitir novos alertas ao vivo.
- Criar gráficos históricos usando a CoinGecko /api/v3/coins/{id}/market_chart.
- Adicionar autenticação (NextAuth + OAuth/Web3) para multiusuários.
- Publicar na Vercel ou Railway e configurar cron-jobs com Edge Functions.

> "Siga o coelho branco" — explore, ajuste e expanda este painel mágico para seu fluxo de trading! 🐇
	•	🔗 Integração DeFi Direta: Para usuários mais avançados, permitir integração direta com protocolos DeFi: por exemplo, ao detectar oportunidade em uma DEX, o bot poderia, além de alertar, oferecer um botão “executar via MetaMask” ou conectar com WalletConnect para já levar o usuário à tela de swap. Isso poupa tempo em situações de arbitragem ou hype. A segurança aqui seria crucial, mas é uma melhoria poderosa.
	•	📰 Integração de Notícias/Redes Sociais: Expandir a coleta de informações para fontes de notícias (RSS feeds, Twitter hashtags) de forma mais integrada. Já falamos que o Cheshire olha notícias, mas isso poderia ser formalizado: talvez uma seção de “Notícias de Wonderland” que mostra manchetes relevantes recentes, ou alertas especiais se um influenciador grande citar um ativo (com cuidado pra não virar ruído).
	•	📅 Calendário do País das Maravilhas: Uma funcionalidade de calendário exibindo eventos programados do mercado (ex: divulgação de resultados de empresas, vencimento de opções, hardforks de criptomoedas) contextualizados. Tipo: “Dia 15: Reunião do FED (Chapeleiro está atento ao relógio)”, ou “Dia 20: Unlock de tokens do projeto X (Rainha de Copas de olho)”. Isso ajuda usuários a se prepararem para volatilidade esperada.
	•	🔍 Pesquisa e Scanner Personalizado: Dar ao usuário uma ferramenta para ele próprio procurar oportunidades customizadas. Por exemplo: “Me avise quando uma moeda do setor de metaverso subir mais de 10% com volume triplicando”. Ele poderia usar filtros no painel para montar esses critérios (quase um screener de mercado) e salvar buscas. O White Rabbit então executaria também essas buscas personalizadas para ele. Em termos temáticos, seria como dar ao usuário a bússola do Coelho Branco para que ele aponte para onde quer explorar.
	•	🔐 Melhoria no Controle de Risco: Implementar camadas adicionais como um trailing stop automatizado (stop móvel) gerenciado pela Rainha de Copas, ou estratégias de saída parciais (vender metade no primeiro alvo, deixar resto correr). Permitir também ao usuário definir “cap de Gale global” (ex: no dia não fazer mais que X Gales somando todos) se já não incluso. Tudo isso tornaria o sistema ainda mais flexível e seguro.
	•	🎭 Personalização de Tema: Embora a marca seja Wonderland, uma ideia eventual seria permitir skins ou temas alternativos para a interface, para agradar diferentes gostos sem mudar a essência. Por exemplo, talvez um “tema cyberpunk” ou “tema clássico sério” para quem preferir menos fantasia. Mas manteríamos a terminologia interna (ou opção de terminologia padrão de mercado) – isso pode ampliar o alcance a públicos que inicialmente achariam o tema lúdico demais. De qualquer forma, seria uma opção avançada de personalização, mantendo Wonderland como default.
Cada sugestão acima adiciona complexidade, portanto seriam avaliadas conforme prioridade e recursos. Entretanto, elas mostram a visão de longo prazo: fazer do Wonderland Trading Bot não apenas um fornecedor de sinais, mas um ecossistema completo onde tecnologia, narrativa e comunidade se encontram. Assim, a ferramenta continuaria evoluindo e encantando seus usuários, antigos e novos, em uma jornada contínua de inovação “no país das maravilhas” dos mercados financeiros.
