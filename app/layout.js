import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "../components/Header";

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "ItalianPlateNo2-Light.otf" });

export const metadata = {
  title: "Oskar Sælan Halskov",
  description: "Oskar Sælan Halskov",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <Header />
        {/* use a calc height equal to viewport minus header (4rem) so centering isn't affected by top padding */}
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
