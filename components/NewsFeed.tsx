"use client";

import useSWR from "swr";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  published_at: number;
  image_url?: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Falha ao obter notícias");
  }
  return res.json();
};

export function NewsFeed() {
  const { data, error, isLoading } = useSWR<NewsItem[]>("/api/news", fetcher, {
    refreshInterval: 300_000
  });

  if (isLoading) {
    return (
      <div className="glass-panel rounded-3xl p-6 animate-pulse">
        <p className="text-sm text-slate-400">Carregando manchetes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel rounded-3xl p-6">
        <p className="text-sm text-rose-400">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Notícias Encantadas</h2>
        <span className="text-xs uppercase tracking-wide text-slate-400">
          CryptoCompare (free API)
        </span>
      </div>
      <ul className="mt-6 space-y-4">
        {data?.map((news) => (
          <li key={news.id} className="rounded-2xl bg-slate-900/60 p-4">
            <Link href={news.url} target="_blank" className="block">
              <p className="text-sm font-semibold text-slate-100">
                {news.title}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span>{news.source}</span>
                <span>
                  {formatDistanceToNow(new Date(news.published_at), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
