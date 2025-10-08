# Wonderland Trading Bot 🐇✨
Uma documentação técnica encantada para explorar cada canto do Wonderland Trading Bot, mantendo o espírito lúdico de Alice no País das Maravilhas sem perder o rigor necessário para operar em mercados financeiros voláteis.

## Sumário Encantado
- [Visão Geral](#visão-geral)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
  - [Frontend — Interface Mágica](#frontend--interface-mágica)
  - [Backend — Motor Lógico](#backend--motor-lógico)
  - [Memória de Wonderland (Banco de Dados)](#memória-de-wonderland-banco-de-dados)
  - [Portais para Outros Reinos (Integrações)](#portais-para-outros-reinos-integrações)
- [Personagens que Guardam o Reino](#personagens-que-guardam-o-reino)
- [Tipos de Alertas Temáticos](#tipos-de-alertas-temáticos)
- [Fluxo Operacional Encantado](#fluxo-operacional-encantado)
- [Gestão de Risco com a Rainha de Copas](#gestão-de-risco-com-a-rainha-de-copas)
- [Sistema de Gale com o Chapeleiro Maluco](#sistema-de-gale-com-o-chapeleiro-maluco)
- [Dados, Logs e Observabilidade](#dados-logs-e-observabilidade)
- [Experiência do Usuário no Painel Wonderland](#experiência-do-usuário-no-painel-wonderland)
- [Glossário Rápido de Wonderland](#glossário-rápido-de-wonderland)
- [Sugestões e Melhorias Futuras](#sugestões-e-melhorias-futuras)

## Visão Geral
O Wonderland Trading Bot é um sistema de alertas e automação de trading que usa narrativa temática para tornar decisões complexas mais intuitivas. Cada componente recebe a identidade de um personagem icônico de Wonderland, convertendo métricas de risco, sinais de mercado e estratégias de Martingale em uma experiência envolvente para "Alice" — a pessoa que utiliza o bot.

O objetivo é oferecer sinais rápidos e contextualizados sobre oportunidades em mercados de criptomoedas, misturando análise técnica, dados on-chain e verificações de segurança. Ao mesmo tempo, a documentação abraça a fantasia para facilitar o entendimento de fluxos e responsabilidades.

## Arquitetura do Sistema
A arquitetura é organizada em camadas claras, como os diferentes cenários visitados por Alice.

### Frontend — Interface Mágica
- Aplicação web responsiva que prioriza clareza das informações financeiras, mesmo com elementos lúdicos.
- Painel tematizado com ícones, cores e badges que remetem ao universo de Wonderland.
- Configurações acessíveis: níveis de risco, ativação do Gale, filtros de alertas e vínculos com canais externos (Telegram, e-mail, etc.).
- Atualizações em tempo real via WebSockets para que os alertas cheguem assim que os personagens os liberam.

### Backend — Motor Lógico
- Aplicação de alta disponibilidade que coordena múltiplos módulos analíticos em paralelo.
- Responsabilidades principais:
  - **Monitoramento contínuo** com o Coelho Branco, processando APIs e WebSockets em alta frequência.
  - **Análises aprofundadas** com o Gato de Cheshire, que aplica algoritmos técnicos, consulta dados on-chain e calcula SCAM Score.
  - **Decisão e execução** de alertas e estratégias de Gale.
  - **Orquestração** do fluxo completo de dados até o envio final ao usuário.

### Memória de Wonderland (Banco de Dados)
- Armazena históricos de mercado, eventos on-chain, configurações de usuários e assinaturas.
- Mantém logs e auditoria de cada ação tomada, garantindo transparência e melhoria contínua.
- Dados sensíveis criptografados, com backups recorrentes para evitar que memórias do reino se percam.

### Portais para Outros Reinos (Integrações)
- **APIs de exchanges** para preços, volumes, execução de ordens e descoberta de novos ativos.
- **Serviços blockchain** (nós ou exploradores) para monitorar baleias, smart money e contratos suspeitos.
- **Plataformas de notificação** (Telegram, Discord, e-mail, SMS) para distribuir alertas onde Alice estiver.
- **Ferramentas auxiliares** como análise de sentimento, bibliotecas de indicadores técnicos e provedores de pagamento.

## Personagens que Guardam o Reino
Cada módulo assume uma persona para facilitar a compreensão das responsabilidades:

| Personagem | Função Técnica |
| --- | --- |
| 🐇 **White Rabbit** | Sentinela que monitora dados em tempo real e detecta eventos que merecem investigação. |
| 😸 **Cheshire Cat** | Analista que contextualiza sinais, calcula SCAM Score, identifica Smart Money e filtra falsos positivos. |
| 👑 **Queen of Hearts** | Guardiã das regras de segurança e risco. Aprova ou bloqueia alertas perigosos. |
| 🎩 **Mad Hatter** | Executor da estratégia Gale (Martingale), gerenciando tentativas extras após perdas. |
| 🐛 **Lagarta Azul (conceito futuro)** | IA avançada planejada para previsões e diálogo com usuários. |

## Tipos de Alertas Temáticos
- **GROW_ME ("Cresça-me")**: Indica pumps ou movimentos de alta relevantes.
- **SHRINK_ME ("Encolha-me")**: Aponta quedas abruptas ou dumps.
- **RABBIT_HOLE (Toca do Coelho)**: Descobertas complexas, como novos tokens ou sequências incomuns.
- **MAD_TEA_PARTY (Chá do Chapeleiro)**: Confluência positiva de múltiplos sinais.
- **QUEEN_ALERT (Alerta da Rainha)**: Mensagens de segurança avisando sobre bloqueios ou riscos extremos.
- **Whale & Smart Money Badges**: Selos adicionais para transações de grande porte ou carteiras reconhecidas.

## Fluxo Operacional Encantado
1. **White Rabbit** detecta um evento fora do comum (preço, volume, transação on-chain, listagem, etc.).
2. **Cheshire Cat** coleta contexto extra, consulta notícias, verifica liquidez e calcula indicadores de risco.
3. **Queen of Hearts** aplica as regras de segurança; se o sinal não atende aos critérios, ele é vetado.
4. **Mad Hatter** prepara a sequência de Gale caso o usuário tenha habilitado a estratégia.
5. **Frontend** recebe o alerta formatado com badges, recomendações de stop loss/take profit e envia notificações aos canais conectados.

## Gestão de Risco com a Rainha de Copas
- Define tiers de risco (1 = seguro, 3 = arrojado) para cada alerta.
- Aplica limites globais e específicos por usuário para evitar exposição excessiva.
- Sugere stops, take profit e políticas como trailing stop ou saídas parciais.
- Mantém auditoria completa para explicar decisões e garantir confiança.

## Sistema de Gale com o Chapeleiro Maluco
- Implementa Martingale de forma controlada, com limites de tentativas e exposição máxima.
- Ajusta o tamanho das posições a cada tentativa, tentando recuperar perdas sem comprometer o capital.
- Trabalha em conjunto com a Rainha de Copas para interromper sequências perigosas.

## Dados, Logs e Observabilidade
- Histórico de preços, volumes, liquidez, eventos on-chain e configurações ficam centralizados.
- Logs detalhados documentam cada alerta emitido, bloqueado ou executado automaticamente.
- Métricas alimentam backtests, relatórios e possíveis módulos de IA (Lagarta Azul).

## Experiência do Usuário no Painel Wonderland
- Painel web com visual temático, porém organizado para leitura rápida de dados.
- Badges e ícones destacam informações críticas (Smart Money, Whale, risco, status do Gale).
- Onboarding com glossário e narrativas ajuda iniciantes a entenderem termos técnicos.
- Possibilidade de gamificação, rankings e conquistas para engajar a comunidade.

## Glossário Rápido de Wonderland
| Termo | Significado |
| --- | --- |
| **Alice** | Usuário que recebe alertas e interage com o painel. |
| **Tier** | Nível de risco do sinal (1 a 3). |
| **SCAM Score** | Indicador de potencial fraude de um projeto/token. |
| **Smart Money** | Investidores relevantes acompanhados pelo sistema. |
| **Whale** | Carteiras que movimentam grandes quantias. |
| **Stop Loss / Take Profit** | Ordens automáticas para limitar perdas ou garantir lucros. |
| **Mempool** | Fila de transações pendentes na blockchain. |
| **Backtest** | Simulação histórica para validar estratégias. |
| **$WONDER** | Token utilitário do ecossistema Wonderland. |

## Sugestões e Melhorias Futuras
- 🐛 **Oráculo da Lagarta**: IA que responde dúvidas dos usuários com insights preditivos.
- 🤝 **Gêmeos Tweedledee & Tweedledum**: Estratégias paralelas que confirmam sinais quando há consenso.
- 📊 **Replay e Backtesting Visual**: Revisão animada do que aconteceu após cada alerta.
- 🎮 **Gamificação**: Badges, desafios e recompensas em tokens $WONDER para incentivar o aprendizado.
- 📱 **Aplicativo móvel nativo**: Melhor experiência de notificações e widgets com últimos sinais.
- 🌐 **Social Trading**: Feed para troca de ideias e competições amistosas entre usuários.
- 🔗 **Integração DeFi direta**: Acesso rápido a swaps em DEX e protocolos financeiros.
- 📰 **Notícias e Sentimento**: Consolidação de manchetes relevantes dentro do painel.
- 📅 **Calendário de Wonderland**: Eventos macro e específicos que podem impactar o mercado.
- 🔍 **Scanner Personalizado**: Filtros customizáveis para que o usuário crie seus próprios gatilhos.
- 🔐 **Controles de Risco Avançados**: Trailing stop automatizado, limites diários de Gale e saídas parciais.
- 🎭 **Temas Alternativos**: Permitir skins opcionais sem perder a essência Wonderland.

---

> "Siga o coelho branco, mas mantenha a Rainha por perto." – Documentação encantada do Wonderland Trading Bot
	•	🔗 Integração DeFi Direta: Para usuários mais avançados, permitir integração direta com protocolos DeFi: por exemplo, ao detectar oportunidade em uma DEX, o bot poderia, além de alertar, oferecer um botão “executar via MetaMask” ou conectar com WalletConnect para já levar o usuário à tela de swap. Isso poupa tempo em situações de arbitragem ou hype. A segurança aqui seria crucial, mas é uma melhoria poderosa.
	•	📰 Integração de Notícias/Redes Sociais: Expandir a coleta de informações para fontes de notícias (RSS feeds, Twitter hashtags) de forma mais integrada. Já falamos que o Cheshire olha notícias, mas isso poderia ser formalizado: talvez uma seção de “Notícias de Wonderland” que mostra manchetes relevantes recentes, ou alertas especiais se um influenciador grande citar um ativo (com cuidado pra não virar ruído).
	•	📅 Calendário do País das Maravilhas: Uma funcionalidade de calendário exibindo eventos programados do mercado (ex: divulgação de resultados de empresas, vencimento de opções, hardforks de criptomoedas) contextualizados. Tipo: “Dia 15: Reunião do FED (Chapeleiro está atento ao relógio)”, ou “Dia 20: Unlock de tokens do projeto X (Rainha de Copas de olho)”. Isso ajuda usuários a se prepararem para volatilidade esperada.
	•	🔍 Pesquisa e Scanner Personalizado: Dar ao usuário uma ferramenta para ele próprio procurar oportunidades customizadas. Por exemplo: “Me avise quando uma moeda do setor de metaverso subir mais de 10% com volume triplicando”. Ele poderia usar filtros no painel para montar esses critérios (quase um screener de mercado) e salvar buscas. O White Rabbit então executaria também essas buscas personalizadas para ele. Em termos temáticos, seria como dar ao usuário a bússola do Coelho Branco para que ele aponte para onde quer explorar.
	•	🔐 Melhoria no Controle de Risco: Implementar camadas adicionais como um trailing stop automatizado (stop móvel) gerenciado pela Rainha de Copas, ou estratégias de saída parciais (vender metade no primeiro alvo, deixar resto correr). Permitir também ao usuário definir “cap de Gale global” (ex: no dia não fazer mais que X Gales somando todos) se já não incluso. Tudo isso tornaria o sistema ainda mais flexível e seguro.
	•	🎭 Personalização de Tema: Embora a marca seja Wonderland, uma ideia eventual seria permitir skins ou temas alternativos para a interface, para agradar diferentes gostos sem mudar a essência. Por exemplo, talvez um “tema cyberpunk” ou “tema clássico sério” para quem preferir menos fantasia. Mas manteríamos a terminologia interna (ou opção de terminologia padrão de mercado) – isso pode ampliar o alcance a públicos que inicialmente achariam o tema lúdico demais. De qualquer forma, seria uma opção avançada de personalização, mantendo Wonderland como default.
Cada sugestão acima adiciona complexidade, portanto seriam avaliadas conforme prioridade e recursos. Entretanto, elas mostram a visão de longo prazo: fazer do Wonderland Trading Bot não apenas um fornecedor de sinais, mas um ecossistema completo onde tecnologia, narrativa e comunidade se encontram. Assim, a ferramenta continuaria evoluindo e encantando seus usuários, antigos e novos, em uma jornada contínua de inovação “no país das maravilhas” dos mercados financeiros.
