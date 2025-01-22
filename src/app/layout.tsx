import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title:{
    default:"Alnoor",
    template:"Alnoor | %s"
  } ,
  description: "Home Page...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
        <Navbar/>
        </div>
        <div>
        {children}
        </div>
      </body>
    </html>
  );
}
