import React from "react";
import { outfit, sacramento, cinzel, khand } from "../fonts/font";
import "./layout.css";
import "./globals.css";
import "./responsive.css";
import { ConditionalHeader, ConditionalFooter } from "@/components/layout/ConditionalLayout";
import TopButton from "@/components/layout/TopButton";

export const metadata = {
  title: "ABEER.LABEL – Wear Your Soul | Luxury Women's Ethnic Wear",
  description: "Abeer.label | Fashion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${sacramento.variable} ${cinzel.variable} ${khand.variable} ${outfit.className}`}>
        <ConditionalHeader />
        {children}
        <ConditionalFooter />
        <TopButton />
      </body>
    </html>
  );
}