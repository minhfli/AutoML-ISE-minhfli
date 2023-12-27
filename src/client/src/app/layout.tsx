import { ThemeProvider } from "@/src/components/ui/theme-provider";
import { ModeToggle } from "@/src/components/ui/toggle-mode";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/src/components/ui/sonner"
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoML-Platform',
  description: 'Automated Machine Learning Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={inter.className}>
        <main>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange>
            <div className="mode-toggle-container">
              <ModeToggle />
            </div>
            {children}
            <Toaster />
          </ThemeProvider>

        </main>
      </body>
    </html>
  )
}
