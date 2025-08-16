import { Inter } from "next/font/google";
import "./globals.css";
import Notifications from "@/app/components/Notifications";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/app/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AuctionHub - Live Real-Time Auctions",
  description: "Join exciting live auctions with real-time bidding. Discover unique items and place bids instantly.",
  icons: {
    icon: "/globe.svg",  
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <Notifications />
          <Header />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
