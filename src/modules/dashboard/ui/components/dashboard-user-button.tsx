import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
export const DashboardUserButton = () => {
    const {data,isPending}=authClient.useSession()

    if(isPending || !data?.user) {
        return null
    }


  return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
            {data.user.image ?(
                <Avatar>
                    <AvatarImage src={data.user.image} />
                </Avatar>
                
            ):(
                <GeneratedAvatar seed={data.user.name} variant="botttsNeutral" />
                
            )}
        </DropdownMenuTrigger>
      </DropdownMenu>
  )
}
