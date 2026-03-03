import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Música aos Montes | Casa Criativa",
  description:
    "Música aos Montes é uma Casa Criativa em Belo Horizonte. Selo musical, produção, gravação audiovisual, branding artístico e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
