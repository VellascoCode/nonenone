import { NextResponse } from "next/server";

const CRYPTOCOMPARE_NEWS =
  "https://min-api.cryptocompare.com/data/v2/news/?lang=PT&categories=BTC,ETH,Blockchain,Trading";

export async function GET() {
  try {
    const response = await fetch(CRYPTOCOMPARE_NEWS, {
      headers: {
        accept: "application/json"
      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Não foi possível obter notícias agora." },
        { status: 502 }
      );
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.Data) ? payload.Data : [];

    return NextResponse.json(
      items.slice(0, 6).map((item: any) => ({
        id: item.id,
        title: item.title,
        source: item.source_info?.name ?? "CryptoCompare",
        url: item.url,
        published_at: (item.published_on ?? 0) * 1000,
        image_url: item.imageurl
      }))
    );
  } catch (error) {
    console.error("Erro ao buscar CryptoCompare", error);
    return NextResponse.json(
      { message: "Falha inesperada ao carregar notícias." },
      { status: 500 }
    );
  }
}
