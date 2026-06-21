import React from "react";
import { outfit, sacramento, cinzel, khand } from "../fonts/font";
import "./layout.css";
import "./globals.css";
import "./responsive.css";

export const metadata = {
  title: "ABEER.LABEL – Dashboard",
  description: "Abeer.label | Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${sacramento.variable} ${cinzel.variable} ${khand.variable} ${outfit.className}`}>
        {children}
      </body>
    </html>
  );
}