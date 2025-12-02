import { Archivo, Blinker } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const blinker = Blinker({
  variable: "--font-blinker",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "FUNDEDBIT - Exclusive Waiting List Access",
  description: "Join the FUNDEDBIT waiting list and enter the giveaway for funding accounts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${blinker.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
