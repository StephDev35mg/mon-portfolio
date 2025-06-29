import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, Mail, MapPin, Calendar } from "lucide-react"
import Image from "next/image"


interface ProfileHeaderProps {
    user: {
        name?: string
        email?: string
        image?: string
        location?: string
        joined?: string
        badge?: string
    }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const profileImage = user?.image || "/steph.jpg"
    const altText = user?.name || "Profile picture"
    return (
        <div className="mb-8">
            <div className="p-6 bg-card rounded-lg shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative">
                        <Image
                            src={profileImage}
                            alt={altText}
                            width={128}  // équivalent à w-32
                            height={128} // équivalent à h-32
                            className="rounded-full object-cover w-28 h-28 sm:w-32 sm:h-32"
                        />
                        <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8">
                            <Camera className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                               
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm sm:text-base">{user.email}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                            {user.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{user.location}</span>
                                </div>
                            )}
                            {user.joined && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{user.joined}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 