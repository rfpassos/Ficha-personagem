import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SplashScreen } from "@/components/ui/splash-screen";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Loop Studio IA",
  description: "Modelo de Projeto Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={urbanist.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreen />
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
