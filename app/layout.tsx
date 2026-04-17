import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardCraft",
  description:
    "CardCraft is a marketplace product card generator for kids and teen fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
