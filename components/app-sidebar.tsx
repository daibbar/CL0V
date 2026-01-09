"use client"

import type * as React from "react"
import { Activity, Calendar, ChevronUp, Home, MapPin, Settings, Trophy, UserCheck, UserCircle, UserPlus, Users } from "lucide-react"
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
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Students",
      url: "/students",
      icon: Users,
    },
    {
      title: "Clubs",
      url: "/clubs",
      icon: Trophy,
    },
    {
      title: "Memberships",
      url: "/memberships",
      icon: UserCheck,
    },
    {
      title: "Events",
      url: "/events",
      icon: Calendar,
    },
    {  
      title: "Activities",
      url: "/activities",
      icon: Activity,
    },
    {
      title: "Resources",
      url: "/resources",
      icon: MapPin,
    },
    {
      title: "Guests",
      url: "/guests",
      icon: UserPlus,
    },
    {
      title: "Admins",
      url: "/admins",
      icon: UserCheck,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="group-data-[collapsible=icon]:w-20" {...props}>
      <SidebarHeader className="pt-4 pb-2 px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:pt-3 group-data-[collapsible=icon]:pb-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              asChild 
              className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 transition-all duration-300 border border-white/10 shadow-lg group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:h-11 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
            >
              <a href="/dashboard" className="flex items-center gap-2 w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
                <div className="bg-white text-primary flex aspect-square size-8 items-center justify-center rounded-xl shadow-inner group-data-[collapsible=icon]:size-7 group-data-[collapsible=icon]:rounded-lg transition-all duration-200 shrink-0">
                  <Trophy className="size-5 fill-current group-data-[collapsible=icon]:size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:hidden overflow-hidden">
                  <span className="text-lg font-black tracking-tight text-white truncate">Campus manager</span>
                  <span className="text-[10px] font-medium text-white/60 uppercase tracking-widest truncate">Campus Manager</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:flex-col">
        <SidebarGroup className="group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
          <SidebarGroupLabel className="text-white/40 uppercase tracking-widest text-[10px] font-bold mt-4 mb-2 px-2 group-data-[collapsible=icon]:hidden">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent className="group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
            <SidebarMenu className="gap-1.5 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title} className="group-data-[collapsible=icon]:w-auto">
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title} 
                    isActive={pathname === item.url}
                    className="rounded-xl px-3 py-5 hover:bg-white/10 hover:text-white data-[active=true]:bg-white/20 data-[active=true]:text-white transition-all duration-200 active:scale-95 group/item group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:h-11 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                  >
                    <a href={item.url} className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                      <item.icon className="size-5 opacity-70 group-hover/item:opacity-100 group-data-[active=true]/item:opacity-100 transition-opacity shrink-0 group-data-[collapsible=icon]:size-5" />
                      <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:pb-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
        <div className="rounded-2xl bg-white/5 border border-white/5 p-1 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="rounded-xl data-[state=open]:bg-white/10 hover:bg-white/10 transition-colors group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:h-11 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                  >
                    <Avatar className="size-8 rounded-lg border-2 border-white/10 group-data-[collapsible=icon]:size-9 shrink-0">
                      <AvatarImage src="/avatar.jpg" alt="Admin" />
                      <AvatarFallback className="rounded-lg bg-accent text-white font-bold">AD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-1 group-data-[collapsible=icon]:hidden overflow-hidden min-w-0">
                      <span className="truncate font-bold text-white">Admin User</span>
                      <span className="text-white/50 truncate text-xs">admin@club.com</span>
                    </div>
                    <ChevronUp className="ml-auto size-4 text-white/50 group-data-[collapsible=icon]:hidden shrink-0" />
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