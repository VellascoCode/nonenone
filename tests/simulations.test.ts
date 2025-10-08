import { describe, it, expect, vi, afterAll } from "vitest";
import { monteCarloSimulation, simulateMartingaleStrategy } from "@/lib/simulations";

const randomSpy = vi.spyOn(Math, "random").mockImplementation(() => 0.42);

afterAll(() => {
  randomSpy.mockRestore();
});

describe("simulateMartingaleStrategy", () => {
  it("calcula corretamente a progressão de apostas", () => {
    const result = simulateMartingaleStrategy({
      initialStake: 50,
      successRate: 0.6,
      maxSteps: 3,
      rewardRatio: 0.8
    });

    expect(result.steps).toHaveLength(3);
    expect(result.steps[0]).toMatchObject({ stake: 50, cumulativeRisk: 50 });
    expect(result.steps[2]).toMatchObject({ stake: 200, cumulativeRisk: 350 });
    expect(result.successProbability).toBeCloseTo(0.936, 3);
  });
});

describe("monteCarloSimulation", () => {
  it("produz sumário coerente a partir de inputs fixos", () => {
    const summary = monteCarloSimulation({
      initialBalance: 1000,
      winRate: 0.55,
      averageWin: 120,
      averageLoss: 90,
      trades: 10,
      iterations: 5
    });

    expect(summary.medianBalance).toBeGreaterThan(0);
    expect(summary.bestBalance).toBeGreaterThanOrEqual(summary.medianBalance);
    expect(summary.worstBalance).toBeLessThanOrEqual(summary.medianBalance);
  });
});
