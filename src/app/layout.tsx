import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import MainProvider from "@/providers/MainProvider";
import { Toaster } from "@/components/ui/toaster";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: "%s | Todo App",
		default: "Todo App",
	},
	description: "A simple todo app built with Supabase, Next.js and Tailwind CSS.",
	creator: "Omar Afet",
	keywords: ["todo", "app", "supabase", "next.js", "tailwindcss"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="!scroll-smooth" suppressHydrationWarning>
			<body className={`${font.className} h-screen antialiased flex flex-col`}>
				<MainProvider>
					<Header />
					<main className="flex-1 container my-8 md:my-16">{children}</main>
					<Footer />
					<Toaster />
				</MainProvider>
			</body>
		</html>
	);
}
