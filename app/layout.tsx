import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/queryProvider";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Synchub",
  description:
    "Créer un espace authentique pour les développeurs et passionnés de tech au Sénégal (et Afrique francophone) où l’on se découvre, apprend et construit ensemble, avec de vraies communautés (pas des hashtags) et la collaboration de projets au cœur de l’expérience.",
  icons: {
    icon: "./favi.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
