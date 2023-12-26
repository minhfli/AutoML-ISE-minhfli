import { ThemeProvider } from "@/src/components/ui/theme-provider"
import type { Metadata } from 'next'
import { ModeToggle } from "@/src/components/ui/toggle-mode"
import { Inter } from 'next/font/google'
import './globals.css'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mode-toggle-container">
            <ModeToggle />
          </div>
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
