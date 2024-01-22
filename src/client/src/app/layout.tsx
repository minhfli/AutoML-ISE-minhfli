import {ThemeProvider} from "@/src/components/ui/theme-provider";
import {ModeToggle} from "@/src/components/ui/toggle-mode";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "@/src/components/ui/sonner";
import "./globals.css";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/components/ui/avatar";
import logo from "@/public/logo.png";
import Link from "next/link";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "AutoML-Platform",
    description: "Automated Machine Learning Platform",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} flex h-screen flex-col`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
        >
            {/*header*/}
            <header className="navbar border border-b-black bg-base-200">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href="/">
                        Research and Development
                    </Link>
                </div>
                <div className="flex justify-between md:hidden">
                    {/* Hamburger Menu Icon (only visible on small screens) */}
                    <button className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden justify-between md:flex">
                    <div className="flex-none">
                        <ModeToggle/>
                    </div>
                    <div className="flex-none">
                        <Avatar>
                            <AvatarImage src={logo.src as string}/>
                            <AvatarFallback>Meow</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            {/* Content area */}
            <main className="flex-grow p-4 ">{children}</main>
            <Toaster richColors expand={false} duration={5000}/>
        </ThemeProvider>
        </body>
        </html>
    );
}
