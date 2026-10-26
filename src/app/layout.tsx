import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireFlow — AI-Powered Talent Acquisition & ATS Platform",
  description: "Enterprise applicant tracking system with semantic candidate matching, real-time messaging, and multi-tenant recruiter pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                borderRadius: '12px',
                padding: '14px 18px',
                color: '#0f172a',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                border: '1px solid #e2e8f0',
              },
              success: {
                iconTheme: {
                  primary: '#2563eb',
                  secondary: '#fff',
                },
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
