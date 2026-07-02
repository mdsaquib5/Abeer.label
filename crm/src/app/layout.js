import { outfit, sacramento, cinzel, khand } from "../fonts/font";
import "./layout.css";
import "./globals.css";

import { Toaster } from 'sonner';

export const metadata = {
  title: "ABEER.LABEL – CRM",
  description: "Abeer.label | CRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${sacramento.variable} ${cinzel.variable} ${khand.variable} ${outfit.className}`}>
        {children}
        <Toaster 
          theme="dark" 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid #dfa16940',
              color: '#ffffff',
              fontFamily: 'var(--font-outfit)'
            }
          }}
        />
      </body>
    </html>
  );
}