import { Montserrat, Geist_Mono, Nunito, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const nunito = Nunito({
  variable: "--font-heading-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hiyosashii Portfolio - Abdul Aziz Dinata",
  description:
    "Creative Digital Portfolio — Editing, Design, UI/UX, and AI-Assisted Development.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${nunito.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
