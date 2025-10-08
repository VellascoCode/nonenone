import { randomNormal } from "./utils";

export type MartingaleStep = {
  step: number;
  stake: number;
  cumulativeRisk: number;
  expectedBalance: number;
};

export type SimulationResult = {
  steps: MartingaleStep[];
  successProbability: number;
  expectedDrawdown: number;
  projectedProfit: number;
};

export interface SimulationInput {
  initialStake: number;
  successRate: number;
  maxSteps: number;
  rewardRatio: number;
}

export function simulateMartingaleStrategy({
  initialStake,
  successRate,
  maxSteps,
  rewardRatio
}: SimulationInput): SimulationResult {
  const steps: MartingaleStep[] = [];
  let stake = initialStake;
  let cumulativeRisk = 0;
  let expectedBalance = 0;

  for (let step = 1; step <= maxSteps; step++) {
    cumulativeRisk += stake;
    expectedBalance += successRate * stake * rewardRatio - (1 - successRate) * stake;
    steps.push({
      step,
      stake: Number(stake.toFixed(2)),
      cumulativeRisk: Number(cumulativeRisk.toFixed(2)),
      expectedBalance: Number(expectedBalance.toFixed(2))
    });
    stake *= 2;
  }

  const projectedProfit = Number((initialStake * rewardRatio).toFixed(2));
  const expectedDrawdown = Number((cumulativeRisk * (1 - successRate)).toFixed(2));

  return {
    steps,
    successProbability: Number((1 - Math.pow(1 - successRate, maxSteps)).toFixed(4)),
    expectedDrawdown,
    projectedProfit
  };
}

export interface MonteCarloInput {
  initialBalance: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  iterations?: number;
  trades?: number;
}

export type MonteCarloSummary = {
  medianBalance: number;
  percentile10: number;
  percentile90: number;
  worstBalance: number;
  bestBalance: number;
};

export function monteCarloSimulation({
  initialBalance,
  winRate,
  averageWin,
  averageLoss,
  iterations = 500,
  trades = 50
}: MonteCarloInput): MonteCarloSummary {
  const endingBalances: number[] = [];

  for (let i = 0; i < iterations; i++) {
    let balance = initialBalance;
    for (let j = 0; j < trades; j++) {
      const win = Math.random() < winRate;
      const variance = randomNormal(0, 0.1);
      if (win) {
        balance += averageWin * (1 + variance);
      } else {
        balance -= averageLoss * (1 + variance);
      }
      balance = Math.max(balance, 0);
    }
    endingBalances.push(balance);
  }

  endingBalances.sort((a, b) => a - b);
  const percentile = (p: number) => {
    const idx = Math.floor(p * endingBalances.length);
    return Number(endingBalances[Math.min(idx, endingBalances.length - 1)].toFixed(2));
  };

  return {
    medianBalance: percentile(0.5),
    percentile10: percentile(0.1),
    percentile90: percentile(0.9),
    worstBalance: Number(endingBalances[0].toFixed(2)),
    bestBalance: Number(endingBalances[endingBalances.length - 1].toFixed(2))
  };
}
