import { Inter } from "next/font/google";
import "./globals.css";
import GoogleVerification from "./components/GoogleVerification";

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
  description:
    "Join the FUNDEDBIT waiting list and enter the giveaway for funding accounts",
  icons: {
    icon: "/logo.svg",
  },
  verification: {
    google: "6hae6Nulsu85ZtPPvT9re1wq3PSeubVJpb9iWkGATek",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <head>
        <meta 
          name="google-site-verification" 
          content="6hae6Nulsu85ZtPPvT9re1wq3PSeubVJpb9iWkGATek" 
        />
      </head>
      <body
        className={`${interDisplay.variable} ${inter.variable} antialiased`}
      >
         {/* <GoogleVerification /> */}
        {children}
      </body>
    </html>
  );
}
