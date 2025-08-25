"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { LogOut, Moon, Search, Sun } from "lucide-react";
import { useAuthStore } from "@/stores/auth/authState";
import { logout } from "@/hooks/auth/useAuth";
import { useState, useEffect } from "react";

export function TopNavigation() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const logoutMutation = logout();

  // Animation du texte qui change
  const animatedTexts = [
    user?.username || "@Username",
    user?.email || "Email",
    user?.title || "Title",
  ].filter(Boolean);

  useEffect(() => {
    if (animatedTexts.length > 1) {
      const interval = setInterval(() => {
        setIsAnimating(true);

        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
          setIsAnimating(false);
        }, 300); // Half of the animation duration for smooth transition
      }, 3000); // Increased interval to 3 seconds for better readability

      return () => clearInterval(interval);
    }
  }, [animatedTexts.length]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-background border-b sticky top-0 z-50">
      {/* Avatar utilisateur */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user?.avatarPicture || ""}
            alt={`${user?.firstName} ${user?.lastName}` || "User"}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user?.firstName?.charAt(0).toUpperCase() ||
              user?.lastName?.charAt(0).toUpperCase() ||
              "U"}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <p className="text-sm font-medium">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.email}
          </p>
          <div className="relative h-5 overflow-hidden w-full z-10">
            <p
              className={`text-xs text-muted-foreground absolute transition-all duration-700 ease-out transform w-full ${
                isAnimating
                  ? "opacity-0 translate-y-2 scale-95 blur-sm"
                  : "opacity-100 translate-y-0 scale-100 blur-0"
              }`}
              style={{
                background:
                  "linear-gradient(90deg, currentColor 0%, currentColor 70%, transparent 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                animation: isAnimating
                  ? "none"
                  : "subtle-glow 3s ease-in-out infinite alternate",
              }}
            >
              {animatedTexts[currentTextIndex]}
            </p>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 w-full rounded-xl"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Toggle dark/light mode avec effet 3D */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 relative group transition-all duration-300 hover:scale-105 hover:shadow-md"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(145deg, #374151, #1f2937)"
                : "linear-gradient(145deg, #f3f4f6, #e5e7eb)",
            boxShadow:
              theme === "dark"
                ? "3px 3px 6px #1a1a1a, -3px -3px 6px #404040"
                : "3px 3px 6px #d1d5db, -3px -3px 6px #ffffff",
          }}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-yellow-400 drop-shadow-lg transition-all duration-300 group-hover:rotate-12" />
          ) : (
            <Moon className="h-4 w-4 text-blue-600 drop-shadow-lg transition-all duration-300 group-hover:-rotate-12" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Déconnexion avec effet 3D */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="h-8 w-8 relative group transition-all duration-300 hover:scale-105 hover:shadow-md"
          style={{
            background: "linear-gradient(145deg, #fca5a5, #ef4444)",
            boxShadow: "3px 3px 6px #dc2626, -3px -3px 6px #f87171",
          }}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-4 w-4 text-white drop-shadow-lg transition-all duration-300 group-hover:translate-x-1" />
          <span className="sr-only">Se déconnecter</span>
        </Button>
      </div>

      <style jsx>{`
        @keyframes subtle-glow {
          0% {
            filter: brightness(1) contrast(1);
            text-shadow: 0 0 2px currentColor;
          }
          100% {
            filter: brightness(1.1) contrast(1.05);
            text-shadow: 0 0 4px currentColor;
          }
        }
      `}</style>
    </div>
  );
}
