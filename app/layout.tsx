import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TECNOFLEX — Tu casillero virtual en USA sin taxes",
  description:
    "Compra en Estados Unidos sin impuesto. Recibe en Colombia sin complicaciones. Dirección en Oregon con 0% Sales Tax.",
  keywords: ["casillero virtual", "compras USA", "envío Colombia", "Oregon sin tax", "TECNOFLEX"],
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