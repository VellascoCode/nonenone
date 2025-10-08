"use client";

import useSWR from "swr";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Falha ao carregar dados de mercado");
  }
  return res.json();
};

export function MarketPulse() {
  const { data, error, isLoading } = useSWR<MarketAsset[]>(
    "/api/marketpulse",
    fetcher,
    {
      refreshInterval: 60_000
    }
  );

  if (isLoading) {
    return (
      <div className="glass-panel rounded-2xl p-6 animate-pulse">
        <p className="text-sm text-slate-400">Carregando panorama de mercado...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel rounded-2xl p-6">
        <p className="text-sm text-rose-400">{error.message}</p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="glass-panel rounded-2xl p-6">
        <p className="text-sm text-slate-400">Nenhum ativo disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Panorama de Mercado</h2>
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Fonte: CoinGecko
        </span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {data.map((asset) => (
          <div
            key={asset.id}
            className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-4 transition hover:shadow-glow"
          >
            <div className="flex items-center gap-3">
              <Image
                src={asset.image}
                alt={asset.name}
                width={36}
                height={36}
                className="rounded-full border border-slate-700"
              />
              <div>
                <p className="font-semibold text-slate-100">
                  {asset.name}
                  <span className="ml-2 text-xs uppercase text-slate-400">
                    {asset.symbol}
                  </span>
                </p>
                <p className="text-sm text-slate-400">
                  Volume 24h: {formatCurrency(asset.total_volume)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-100">
                {formatCurrency(asset.current_price)}
              </p>
              <p
                className={`text-sm font-medium ${
                  asset.price_change_percentage_24h >= 0
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {asset.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
