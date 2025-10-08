import { prisma } from "../lib/prisma";

async function main() {
  const existing = await prisma.simulationScenario.count();
  if (existing > 0) {
    console.info("Seed skipped: scenarios already exist.");
    return;
  }

  await prisma.simulationScenario.createMany({
    data: [
      {
        name: "Rabbit Hole Discovery",
        baseAsset: "ETH",
        initialCapital: 1500,
        riskTolerance: "Moderado",
        notes: "Configuração padrão para novos sinais encontrados pelo Coelho Branco."
      },
      {
        name: "Chapeleiro Martingale",
        baseAsset: "BTC",
        initialCapital: 2500,
        riskTolerance: "Agressivo",
        notes: "Sequência focada em recuperação rápida com limite de 4 passos."
      },
      {
        name: "Rainha de Copas",
        baseAsset: "USDT",
        initialCapital: 1000,
        riskTolerance: "Conservador",
        notes: "Reserva de capital protegida para oportunidades de baixo risco."
      }
    ]
  });

  console.info("Seed concluído com cenários iniciais.");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
