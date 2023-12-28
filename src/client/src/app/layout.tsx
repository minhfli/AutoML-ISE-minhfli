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

      <body className={`${inter.className} flex flex-col h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
        >
          <header className="navbar bg-base-200 border border-b-black ">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">Research and Development</a>
            </div>
            <div className="flex-none">
              <ModeToggle />
            </div>
          </header>

          {/* Content area */}
          <main className="flex-grow overflow-auto p-4">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
