import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "@/index.css";

const sora = Sora({ 
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Aliko Academy",
  description: "Aliko Academy LMS platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${sora.variable} font-body antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
