import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "DataSync AI | Next-Gen AI Data Automation Platform",
  description: "Experience the future of data automation. Connect, sync, and analyze your data seamlessly with our AI-powered platform.",
  keywords: ["AI", "Data Automation", "SaaS", "Data Platform", "Machine Learning", "Workflow Builder"],
  authors: [{ name: "DataSync AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://datasync-ai.example.com/",
    title: "DataSync AI | Next-Gen AI Data Automation Platform",
    description: "Experience the future of data automation. Connect, sync, and analyze your data seamlessly with our AI-powered platform.",
    siteName: "DataSync AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataSync AI | Next-Gen AI Data Automation Platform",
    description: "Experience the future of data automation. Connect, sync, and analyze your data seamlessly with our AI-powered platform.",
  },
  alternates: {
    canonical: "https://datasync-ai.example.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-white/20 selection:text-white">
        {/* Ambient Lighting Layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="bg-ambient-blob w-[50vw] h-[50vh] bg-white/5 top-[-10%] left-[-10%]"></div>
          <div className="bg-ambient-blob w-[60vw] h-[60vh] bg-white/5 bottom-[-20%] right-[-10%]" style={{ animationDelay: '-15s', animationDuration: '40s' }}></div>
        </div>

        {/* Animated background noise & grid */}
        <div className="bg-grid fixed inset-0 z-0" aria-hidden="true" />
        <div className="bg-noise fixed inset-0 z-0" aria-hidden="true" />
        {/* Navbar */}
        
        <main className="flex-grow z-10 flex flex-col">
          {children}
        </main>
        
        {/* Footer */}
      </body>
    </html>
  );
}
