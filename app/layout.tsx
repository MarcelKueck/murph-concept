import { Nunito, Montserrat } from 'next/font/google';
import './globals.css';

// Define fonts
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Murph - Medical guidance when you need it most',
  description: 'Connect with medical students for accessible explanations and advice',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${montserrat.variable} font-sans bg-white text-gray-800`}>
        {children}
      </body>
    </html>
  );
}
