"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  avatarPicture?: string | null;
  firstName?: string;
  lastName?: string;
  userName?: string;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({
  avatarPicture,
  firstName,
  lastName,
  userName,
  size = "md",
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const getInitials = () => {
    if (userName) return userName.charAt(0).toUpperCase();
    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }
    if (firstName) return firstName.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <Avatar className={`${sizeClasses[size]}`}>
      <AvatarImage
        src={
          avatarPicture ||
          "https://via.placeholder.com/400x400/e5e7eb/6b7280?text=Avatar"
        }
        alt={userName || firstName || "Avatar"}
      />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
}
