import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TodoProvider from "@/context/TodoContext";
import TodoModalProvider from "@/context/TodoModalContext";
import Sidebar from "@/components/Sidebar";
import Providers from "@/components/Providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Pomodoro Todo App",
  },
  metadataBase: new URL("https://pom-todo-list.vercel.app"),
  openGraph: {
    title: "Pomodoro Todo App",
    description:
      "So do you want to create todos with pomodoros? That's the site!.",
    url: "https://pom-todo-list.vercel.app/",
    images: [
      {
        url: "https://pom-todo-list.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Preview image for My todo pap",
      },
    ],
    type: "website",
    siteName: "Pomodoro Todo App",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
