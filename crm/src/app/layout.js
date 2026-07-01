import { outfit, sacramento, cinzel, khand } from "../fonts/font";
import "./globals.css";

export const metadata = {
  title: "ABEER.LABEL – CRM",
  description: "Abeer.label | CRM",
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
