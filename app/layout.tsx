import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCNOflex — Tu casillero virtual en USA",
  description:
    "Compra en Estados Unidos y recibí en Colombia sin complicaciones. Tu casillero virtual en Florida.",
  keywords: ["casillero virtual", "compras USA", "envío Colombia", "TCNOflex", "casillero Florida"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} dark antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}