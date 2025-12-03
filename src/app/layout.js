import { Inter } from "next/font/google";
import "./globals.css";

const interDisplay = Inter({
  variable: "--font-inter-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "FUNDEDBIT - Exclusive Waiting List Access",
  description: "Join the FUNDEDBIT waiting list and enter the giveaway for funding accounts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${interDisplay.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
