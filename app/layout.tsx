import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wonderland Trading Control Center",
  description:
    "Painel Next.js com simulações e integrações para o Wonderland Trading Bot, inspirado em Alice no País das Maravilhas."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-100">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
