import type React from "react"
import { StudentSidebar } from "@/components/student-sidebar"
import { 
  SidebarProvider, 
  SidebarTrigger, 
  SidebarInset 
} from "@/components/ui/sidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <StudentSidebar />
      <SidebarInset> 
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border mx-2" /> 
          <span className="font-medium text-sm">Student Dashboard</span>
        </header>
        <div className="flex-1 p-4 md:p-6 bg-muted/20">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
