import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ikiTraq — find your ikigai, live it daily",
  description:
    "ikiTraq helps you discover your ikigai — your reason for being — and turn it into daily rituals, habits, and reflection. A calm, modern tracker for a deliberate life.",
  keywords: ["ikigai", "habit tracker", "journal", "purpose", "rituals", "self improvement"],
  openGraph: {
    title: "ikiTraq — find your ikigai, live it daily",
    description:
      "Discover your reason for being and turn it into daily rituals, habits, and reflection.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#131210",
};

const themeScript = `
  (function () {
    try {
      var s = localStorage.getItem('ikitraq-theme');
      var d = s === 'dark' || (s === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (d) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
