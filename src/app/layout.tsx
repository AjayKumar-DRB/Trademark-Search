import { TrademarkiaProvider } from "@/context/TrademarkiaContext"; // Import your context provider
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trademarkia Search",
  description: "Trademarkia Task to search for trademarks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <TrademarkiaProvider>
          {children}
        </TrademarkiaProvider>
      </body>
    </html>
  );
}
