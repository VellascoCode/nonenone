import { NextResponse } from "next/server";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export async function GET(
  _request: Request,
  { params }: { params: { asset: string } }
) {
  const asset = params.asset;

  try {
    const marketResponse = await fetch(
      `${COINGECKO_BASE}/coins/${asset}?localization=false&sparkline=false&tickers=false`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!marketResponse.ok) {
      return NextResponse.json(
        { message: "Não foi possível obter dados do ativo solicitado." },
        { status: 502 }
      );
    }

    const marketData = await marketResponse.json();

    return NextResponse.json({
      id: marketData.id,
      symbol: marketData.symbol,
      name: marketData.name,
      image: marketData.image?.large ?? marketData.image?.thumb ?? "",
      market_data: {
        current_price: marketData.market_data?.current_price ?? {},
        price_change_percentage_24h: marketData.market_data?.price_change_percentage_24h ?? 0,
        high_24h: marketData.market_data?.high_24h ?? {},
        low_24h: marketData.market_data?.low_24h ?? {},
        market_cap: marketData.market_data?.market_cap ?? {},
        total_volume: marketData.market_data?.total_volume ?? {}
      }
    });
  } catch (error) {
    console.error("Erro ao consultar CoinGecko", error);
    return NextResponse.json(
      { message: "Falha inesperada ao conectar com o CoinGecko." },
      { status: 500 }
    );
  }
}
