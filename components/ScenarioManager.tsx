"use client";

import { FormEvent, useState, useTransition } from "react";
import useSWR from "swr";
import { formatCurrency } from "@/lib/utils";

interface Scenario {
  id: string;
  name: string;
  baseAsset: string;
  initialCapital: number;
  riskTolerance: string;
  notes?: string | null;
  createdAt: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Não foi possível carregar os cenários");
  }
  return res.json();
};

export function ScenarioManager() {
  const { data, error, mutate, isLoading } = useSWR<{ scenarios: Scenario[] }>(
    "/api/scenarios",
    fetcher,
    {
      refreshInterval: 120_000
    }
  );

  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: "",
    baseAsset: "BTC",
    initialCapital: 1000,
    riskTolerance: "Moderado",
    notes: ""
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const response = await fetch("/api/scenarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          initialCapital: Number(form.initialCapital)
        })
      });

      if (response.ok) {
        setForm({ name: "", baseAsset: "BTC", initialCapital: 1000, riskTolerance: "Moderado", notes: "" });
        mutate();
      }
    });
  };

  return (
    <div className="glass-panel rounded-3xl p-6">
      <h2 className="text-lg font-semibold text-slate-100">Cenários Salvos (SQLite via Prisma)</h2>
      <p className="mt-2 text-sm text-slate-400">
        Armazene configurações táticas no banco de dados local (SQLite). Ideal para testar
        combinações de risco do Wonderland Bot antes de usar capital real.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block text-xs uppercase text-slate-400">
          Nome do Cenário
          <input
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        </label>
        <label className="block text-xs uppercase text-slate-400">
          Ativo Base
          <input
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
            value={form.baseAsset}
            onChange={(event) => setForm((prev) => ({ ...prev, baseAsset: event.target.value }))}
          />
        </label>
        <label className="block text-xs uppercase text-slate-400">
          Capital Inicial
          <input
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
            type="number"
            required
            value={form.initialCapital}
            onChange={(event) => setForm((prev) => ({ ...prev, initialCapital: Number(event.target.value) }))}
          />
        </label>
        <label className="block text-xs uppercase text-slate-400">
          Perfil de Risco
          <select
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
            value={form.riskTolerance}
            onChange={(event) => setForm((prev) => ({ ...prev, riskTolerance: event.target.value }))}
          >
            <option>Conservador</option>
            <option>Moderado</option>
            <option>Agressivo</option>
          </select>
        </label>
        <label className="md:col-span-2 block text-xs uppercase text-slate-400">
          Notas
          <textarea
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-2"
            rows={2}
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </label>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-wonderPurple px-4 py-2 font-semibold text-white shadow-glow transition hover:bg-wonderBlue disabled:opacity-60"
          >
            {isPending ? "Salvando..." : "Salvar cenário"}
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {isLoading && <p className="text-sm text-slate-400">Carregando cenários...</p>}
        {error && <p className="text-sm text-rose-400">{error.message}</p>}
        {data?.scenarios?.length ? (
          data.scenarios.map((scenario) => (
            <div key={scenario.id} className="rounded-2xl bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-slate-100">{scenario.name}</p>
                  <p className="text-xs uppercase text-slate-400">
                    {scenario.baseAsset} • {scenario.riskTolerance}
                  </p>
                </div>
                <div className="text-right text-sm text-slate-400">
                  <p>Capital: {formatCurrency(scenario.initialCapital)}</p>
                  <p>{new Date(scenario.createdAt).toLocaleString("pt-BR")}</p>
                </div>
              </div>
              {scenario.notes && (
                <p className="mt-3 text-sm text-slate-300">{scenario.notes}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">Nenhum cenário cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
