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
        <div className="min-h-screen pt-16">{children}</div>
      </body>
    </html>
  );
}
