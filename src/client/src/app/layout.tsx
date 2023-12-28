import { ThemeProvider } from "@/src/components/ui/theme-provider";
import { ModeToggle } from "@/src/components/ui/toggle-mode";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/src/components/ui/sonner"
import './globals.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import logo from '@/public/logo.png';
import Link from "next/link";
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
              <Link className="btn btn-ghost text-xl" href="/">Research and Development</Link>
            </div>
            <div className="flex justify-between">
              <div className="flex-none">
                <ModeToggle />
              </div>
              <div className="flex-none">
                <Avatar>
                  <AvatarImage src={logo.src as string} />
                  <AvatarFallback>Meow</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Content area */}
          <main className="flex-grow overflow-auto p-4">
            {children}
          </main>
          <Toaster richColors expand={false} />
        </ThemeProvider>
      </body>
    </html>
  )
}
