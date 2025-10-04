'use client'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader ,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator";
import{BotIcon,StarIcon,VideoIcon} from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils"
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";


const firstSection=[
    {
        icon:VideoIcon,
        label:"Meetings",
        href:"/meetings"
    },
    {
        icon:BotIcon,
        label:"Agents",
        href:"/agents"
    }
]
const secondSection=[
    {
        icon:StarIcon,
        label:"Upgrade",
        href:"/upgrade"
    },
];

export const DashboardSidebar = () => {
    const pathname=usePathname();
    return(
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
               <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                <Image src="/logo.svg" width={40} height={40} alt="logo" />
                <p className="text-2xl font-semibold">Meet AI</p>
               </Link>
            </SidebarHeader>
            <div className="px-4 py-4">
                <Separator className="opacity-10 text-[#5D6B68]" />
            </div>
            <SidebarContent>
                <SidebarGroupContent className="px-2">
                    <SidebarMenu>
                        {firstSection.map((item)=>
                            <SidebarMenuItem key={item.label} className={cn("h-10 hover:bg-gradient-to-r from-sidebar-accent/5 via-sidebar-accent/10 to-transparent border-transparent hover:border-l-sidebar-accent",pathname===item.href && "bg-gradient-to-r from-sidebar-accent/5 via-sidebar-accent/10 to-transparent border-l-sidebar-accent")}>
                                <Link href={item.href} className="flex items-center gap-2">
                                <item.icon className="size-5"/>
                                <span className="text-sm font-medium tracking-tight">{item.label}</span></Link>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarGroupContent>

                                <SidebarGroupContent className="px-2">
                    <SidebarMenu>
                        {secondSection.map((item)=>
                            <SidebarMenuItem key={item.label} className={cn("h-10 hover:bg-gradient-to-r from-sidebar-accent/5 via-sidebar-accent/10 to-transparent border-transparent hover:border-l-sidebar-accent",pathname===item.href && "bg-gradient-to-r from-sidebar-accent/5 via-sidebar-accent/10 to-transparent border-l-sidebar-accent")}>
                                <Link href={item.href} className="flex items-center gap-2">
                                <item.icon className="size-5"/>
                                <span className="text-sm font-medium tracking-tight">{item.label}</span></Link>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter>
               <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
    )
}