import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export const metadata: Metadata = {
  title: "Rice Delivery App",
  description: "Order rice and groceries with ease.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <TooltipProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          </TooltipProvider>
        </CartProvider>
      </body>
    </html>
  );
}
