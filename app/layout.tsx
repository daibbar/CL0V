import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { AppSidebar } from "@/components/app-sidebar"
import { 
  SidebarProvider, 
  SidebarTrigger, 
  SidebarInset 
} from "@/components/ui/sidebar"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Club Manager",
  description: "Comprehensive club, event, and student activity management",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          
          <SidebarInset> 
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
              <SidebarTrigger className="-ml-1" />
              <div className="h-4 w-px bg-border mx-2" /> 
              <span className="font-medium text-sm">Dashboard</span>
            </header>
            
            <div className="flex-1 p-4 md:p-6">
              {children}
            </div>
          </SidebarInset>
          
        </SidebarProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}