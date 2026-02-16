import "./globals.css";
import localFont from "next/font/local";
import Header from "../components/Header";
import TransitionWrapper from "../components/TransitionWrapper";
import { getAllProjects } from "../lib/projects";

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "ItalianPlateNo2-Light.otf" });

export const metadata = {
  title: "Oskar Sælan Halskov",
  description: "Oskar Sælan Halskov",
};

export default async function RootLayout({ children }) {
  const projects = await getAllProjects();

  return (
    <html lang="en">
      <body className={myFont.className}>
        <Header projects={projects} />
        <TransitionWrapper>
          <div className="flex flex-col min-h-[calc(100vh-4rem)] pt-16">{children}</div>
        </TransitionWrapper>
      </body>
    </html>
  );
}
