import { MarketPulse } from "@/components/MarketPulse";
import { SimulationForm } from "@/components/SimulationForm";
import { ScenarioManager } from "@/components/ScenarioManager";
import { NewsFeed } from "@/components/NewsFeed";
import { formatCurrency } from "@/lib/utils";

async function getGlobalMetrics() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      next: { revalidate: 300 }
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar métricas globais", error);
    return null;
  }
}

export default async function HomePage() {
  const globalMetrics = await getGlobalMetrics();
  const totalMarketCap = globalMetrics?.data?.total_market_cap?.usd ?? 0;
  const volume24h = globalMetrics?.data?.total_volume?.usd ?? 0;
  const btcDominance = globalMetrics?.data?.market_cap_percentage?.btc ?? 0;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">
      <section className="glass-panel overflow-hidden rounded-3xl p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-wonderPurple/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wonderPurple">
              Wonderland Trading Bot
            </span>
            <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">
              Painel Next.js para sinais encantados, simulações e dados em tempo real.
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              Combine insights mágicos e rigor quantitativo: acompanhe métricas de mercado do CoinGecko,
              salve cenários de risco em um banco SQLite gratuito via Prisma e execute simuladores avançados
              (Martingale e Monte Carlo) diretamente no navegador.
            </p>
          </div>
          <div className="grid w-full max-w-xs gap-4 text-sm text-slate-300">
            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-xs uppercase text-slate-400">Market Cap Global</p>
              <p className="mt-1 text-xl font-semibold text-slate-100">
                {formatCurrency(totalMarketCap)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-xs uppercase text-slate-400">Volume 24h</p>
              <p className="mt-1 text-xl font-semibold text-slate-100">
                {formatCurrency(volume24h)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-xs uppercase text-slate-400">Dominância BTC</p>
              <p className="mt-1 text-xl font-semibold text-emerald-400">
                {btcDominance.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <MarketPulse />
          <SimulationForm />
          <ScenarioManager />
        </div>
        <div className="space-y-8">
          <NewsFeed />
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-lg font-semibold text-slate-100">Integrações Livres</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
              <li>CoinGecko API para preços, métricas globais e panorama de mercado.</li>
              <li>CryptoCompare News API para monitorar manchetes críticas em PT/EN.</li>
              <li>Banco de dados SQLite com Prisma Client para cenários persistidos.</li>
              <li>Supabase SDK pré-configurado para futuros alertas em tempo real.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
