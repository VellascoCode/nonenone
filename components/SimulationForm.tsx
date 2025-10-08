"use client";

import { useState } from "react";
import { simulateMartingaleStrategy, monteCarloSimulation } from "@/lib/simulations";
import { formatCurrency } from "@/lib/utils";

export function SimulationForm() {
  const [initialStake, setInitialStake] = useState(50);
  const [successRate, setSuccessRate] = useState(0.58);
  const [maxSteps, setMaxSteps] = useState(4);
  const [rewardRatio, setRewardRatio] = useState(0.85);
  const [initialBalance, setInitialBalance] = useState(1500);
  const [averageWin, setAverageWin] = useState(120);
  const [averageLoss, setAverageLoss] = useState(80);
  const [monteCarloTrades, setMonteCarloTrades] = useState(40);
  const [iterations, setIterations] = useState(300);

  const martingale = simulateMartingaleStrategy({
    initialStake,
    successRate,
    maxSteps,
    rewardRatio
  });

  const monteCarlo = monteCarloSimulation({
    initialBalance,
    winRate: successRate,
    averageWin,
    averageLoss,
    trades: monteCarloTrades,
    iterations
  });

  return (
    <div className="glass-panel rounded-3xl p-6">
      <h2 className="text-lg font-semibold text-slate-100">Simuladores do Reino</h2>
      <p className="mt-2 text-sm text-slate-400">
        Ajuste os controles para testar a estratégia Martingale do Chapeleiro e um
        cenário probabilístico (Monte Carlo) para os alertas do Wonderland Bot.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Martingale do Chapeleiro
          </h3>

          <label className="block text-xs uppercase text-slate-400">
            Aposta Inicial (${formatCurrency(initialStake)})
            <input
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
              type="range"
              min={10}
              max={250}
              step={5}
              value={initialStake}
              onChange={(event) => setInitialStake(Number(event.target.value))}
            />
          </label>

          <label className="block text-xs uppercase text-slate-400">
            Taxa de Acerto ({(successRate * 100).toFixed(0)}%)
            <input
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
              type="range"
              min={0.45}
              max={0.75}
              step={0.01}
              value={successRate}
              onChange={(event) => setSuccessRate(Number(event.target.value))}
            />
          </label>

          <label className="block text-xs uppercase text-slate-400">
            Passos Máximos ({maxSteps})
            <input
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
              type="range"
              min={1}
              max={6}
              step={1}
              value={maxSteps}
              onChange={(event) => setMaxSteps(Number(event.target.value))}
            />
          </label>

          <label className="block text-xs uppercase text-slate-400">
            Fator de Retorno ({(rewardRatio * 100).toFixed(0)}%)
            <input
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
              type="range"
              min={0.5}
              max={1.2}
              step={0.05}
              value={rewardRatio}
              onChange={(event) => setRewardRatio(Number(event.target.value))}
            />
          </label>

          <div className="rounded-2xl bg-slate-900/60 p-4">
            <p className="text-sm text-slate-300">
              Probabilidade de sucesso em até {maxSteps} passos:
            </p>
            <p className="mt-1 text-2xl font-semibold text-emerald-400">
              {(martingale.successProbability * 100).toFixed(2)}%
            </p>
            <div className="mt-3 space-y-1 text-sm text-slate-400">
              <p>Risco acumulado: {formatCurrency(martingale.steps.at(-1)?.cumulativeRisk ?? 0)}</p>
              <p>Drawdown esperado: {formatCurrency(martingale.expectedDrawdown)}</p>
              <p>Lucro potencial: {formatCurrency(martingale.projectedProfit)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Monte Carlo da Rainha
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs uppercase text-slate-400">
              Saldo Inicial
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
                type="number"
                value={initialBalance}
                onChange={(event) => setInitialBalance(Number(event.target.value))}
              />
            </label>
            <label className="block text-xs uppercase text-slate-400">
              Ganho Médio
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
                type="number"
                value={averageWin}
                onChange={(event) => setAverageWin(Number(event.target.value))}
              />
            </label>
            <label className="block text-xs uppercase text-slate-400">
              Perda Média
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
                type="number"
                value={averageLoss}
                onChange={(event) => setAverageLoss(Number(event.target.value))}
              />
            </label>
            <label className="block text-xs uppercase text-slate-400">
              Nº de Trades
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
                type="number"
                value={monteCarloTrades}
                onChange={(event) => setMonteCarloTrades(Number(event.target.value))}
              />
            </label>
            <label className="block text-xs uppercase text-slate-400">
              Iterações
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
                type="number"
                value={iterations}
                onChange={(event) => setIterations(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="rounded-2xl bg-slate-900/60 p-4">
            <p className="text-sm text-slate-300">Distribuição dos resultados simulados:</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-400">
              <div>
                <p>Mediana</p>
                <p className="text-lg font-semibold text-slate-100">
                  {formatCurrency(monteCarlo.medianBalance)}
                </p>
              </div>
              <div>
                <p>Percentil 90</p>
                <p className="text-lg font-semibold text-emerald-400">
                  {formatCurrency(monteCarlo.percentile90)}
                </p>
              </div>
              <div>
                <p>Percentil 10</p>
                <p className="text-lg font-semibold text-rose-400">
                  {formatCurrency(monteCarlo.percentile10)}
                </p>
              </div>
              <div>
                <p>Pior / Melhor</p>
                <p className="text-lg font-semibold text-slate-100">
                  {formatCurrency(monteCarlo.worstBalance)} / {formatCurrency(monteCarlo.bestBalance)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
