"use client"

import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // optional helper for combining classNames

export const DashboardUserButton = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { data, isPending } = authClient.useSession()

  if (isPending || !data?.user) {
    return null
  }

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/login")
  }

  const handleProfile = () => {
    router.push("/dashboard/profile")
  }

  const avatarNode = data.user.image ? (
    <Avatar className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 shadow-sm">
      <AvatarImage src={data.user.image} alt={data.user.name ?? "User"} />
    </Avatar>
  ) : (
    <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 shadow-sm">
      <GeneratedAvatar seed={data.user.name} variant="botttsNeutral" />
    </div>
  )

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{avatarNode}</DrawerTrigger>

        <DrawerContent className="bg-white border-t border-gray-200">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-lg font-semibold">{data.user.name}</DrawerTitle>
            <DrawerDescription className="text-sm text-gray-500">
              {data.user.email}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-3 p-4">
            <Button
              onClick={handleProfile}
              variant="outline"
              className="rounded-lg text-sm font-medium"
            >
              View Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="rounded-lg text-sm font-medium"
            >
              Logout
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 transition-colors">
          {avatarNode}
          <span className="hidden md:inline text-sm font-medium text-gray-700">
            {data.user.name}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 rounded-lg shadow-md border border-gray-100 bg-white p-1"
      >
        <div className="flex items-center gap-2 px-2 py-1.5">
          {avatarNode}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{data.user.name}</span>
            <span className="text-xs text-gray-500 truncate">{data.user.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleProfile}
          className="cursor-pointer rounded-md text-sm py-2 px-2 hover:bg-gray-100"
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleLogout}
          className="cursor-pointer rounded-md text-sm py-2 px-2 text-red-600 hover:bg-red-50"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
