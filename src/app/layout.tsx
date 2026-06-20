import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { baseMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#0a0e0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
