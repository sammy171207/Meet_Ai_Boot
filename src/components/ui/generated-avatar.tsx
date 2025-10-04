import {createAvatar} from "@dicebear/core";
import {botttsNeutral, initials} from "@dicebear/collection"
import {cn} from "@/lib/utils"

import{Avatar,AvatarImage,AvatarFallback} from "@/components/ui/avatar"
interface GeneratedAvatarProps extends React.ComponentProps<typeof Avatar>{
    seed:string
    className?:string
    variant:"botttsNeutral"|"initials"
}

export function GeneratedAvatar({seed,className,variant,...props}:GeneratedAvatarProps){
    const avatar = createAvatar(variant === "botttsNeutral" ? botttsNeutral : initials, {
        seed,
    })
    return(
        <Avatar className={cn(className)} {...props}>
            <AvatarImage src={avatar.toDataUri()} />
            <AvatarFallback>
                {seed}
            </AvatarFallback>
            </Avatar>
    );
}   