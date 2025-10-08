import { NextResponse } from "next/server";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=24h";

export async function GET() {
  try {
    const response = await fetch(COINGECKO_URL, {
      headers: {
        accept: "application/json"
      },
      next: { revalidate: 120 }
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Não foi possível obter os destaques do CoinGecko." },
        { status: 502 }
      );
    }

    const assets = await response.json();

    return NextResponse.json(
      assets.map((asset: any) => ({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        image: asset.image,
        current_price: asset.current_price ?? 0,
        price_change_percentage_24h: asset.price_change_percentage_24h ?? 0,
        total_volume: asset.total_volume ?? 0
      }))
    );
  } catch (error) {
    console.error("Erro ao buscar CoinGecko", error);
    return NextResponse.json(
      { message: "Falha inesperada na comunicação com CoinGecko." },
      { status: 500 }
    );
  }
}
