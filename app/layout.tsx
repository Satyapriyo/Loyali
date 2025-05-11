import { Suspense } from 'react';
import { WalletProviders } from '@/providers/WalletProvider';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/sonner"
import Header from '@/components/Header';
import Banner from '@/components/Banner';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="transition-colors duration-300">
      {/* Add className here to support fallback styling */}
      <body className={`${inter.className} bg-background text-foreground`}>
        {/* ThemeProvider must wrap the entire app */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<div>Loading wallet...</div>}>
            <WalletProviders>
              <div className="min-h-screen">
                {/* <Navbar /> */}
                <Header />

                <main className="pt-20">
                  <Banner />
                  {/* Main content */}
                  {children}
                  <Toaster />
                  <Analytics />
                </main>
              </div>
            </WalletProviders>
          </Suspense>
        </ThemeProvider>

      </body>
    </html>
  )
}
