import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import Header from "./_components/header";

export const metadata: Metadata = {
	title: "Wikee",
	description: "A wiki app with notion style editing",
};

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
					<ToastProvider />
				</ThemeProvider>
			</body>
		</html>
	);
}
