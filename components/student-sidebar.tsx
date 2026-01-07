"use client"

import type * as React from "react"
import { Activity, Calendar, ChevronUp, Home, Settings, Trophy, UserCircle } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/actions/auth-actions"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: Home,
    },
    {
      title: "Events",
      url: "/student/events",
      icon: Calendar,
    },
    {
      title: "Clubs",
      url: "/student/clubs",
      icon: Trophy,
    },
    {  
      title: "Activities",
      url: "/student/activities",
      icon: Activity,
    },
    {
      title: "My Profile",
      url: "/student/profile",
      icon: UserCircle,
    },
  ],
}

export function StudentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-4 pb-2 px-4 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition-all duration-300 border border-white/10 shadow-lg group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:justify-center">
              <a href="/student/dashboard" className="flex items-center gap-2">
                <div className="bg-white text-primary flex aspect-square size-8 items-center justify-center rounded-xl shadow-inner group-data-[collapsible=icon]:size-6 group-data-[collapsible=icon]:rounded-lg transition-all duration-200">
                  <Trophy className="size-5 fill-current group-data-[collapsible=icon]:size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:hidden">
                  <span className="text-lg font-black tracking-tight text-white">Student Area</span>
                  <span className="text-[10px] font-medium text-white/60 uppercase tracking-widest">Campus Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 uppercase tracking-widest text-[10px] font-bold mt-4 mb-2 px-2 group-data-[collapsible=icon]:hidden">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title} 
                    isActive={pathname === item.url}
                    className="rounded-xl px-3 h-14 hover:bg-white/10 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white transition-all duration-200 active:scale-95 group/item group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-5 opacity-70 group-hover/item:opacity-100 group-data-[active=true]/item:opacity-100 transition-opacity" />
                      <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-1">
        <div className="rounded-2xl bg-white/5 border border-white/5 p-1 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="rounded-xl data-[state=open]:bg-white/10 hover:bg-white/10 transition-colors group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
                  >
                    <Avatar className="size-8 rounded-lg border-2 border-white/10 group-data-[collapsible=icon]:size-8">
                      <AvatarImage src="/avatar.jpg" alt="Student" />
                      <AvatarFallback className="rounded-lg bg-accent text-white font-bold">ST</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-1 group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-bold text-white">Student</span>
                      <span className="text-white/50 truncate text-xs">student@school.com</span>
                    </div>
                    <ChevronUp className="ml-auto size-4 text-white/50 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-white/10 bg-sidebar text-white shadow-2xl"
                  side="top"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white rounded-lg cursor-pointer">
                    <UserCircle className="mr-2 size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white rounded-lg cursor-pointer">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className="focus:bg-destructive/20 focus:text-destructive rounded-lg cursor-pointer text-destructive/80">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
