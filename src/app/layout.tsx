import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { Toaster } from "@/components/shadcn/toaster";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Holydevs - ",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   return (
      <ClerkProvider localization={frFR}>
         <html lang="fr" suppressHydrationWarning>
            <body className={cn("w-full min-h-screen", inter.className)}>
               <Toaster />
               <ReactQueryProvider>
                  <main>{children}</main>
               </ReactQueryProvider>
            </body>
         </html>
      </ClerkProvider>
   );
}
