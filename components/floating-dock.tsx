"use client";

import { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/floating";
import {
  IconLogout,
  IconMoon,
  IconSun,
  IconSearch,
  IconLanguage,
  IconBell,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useNotifications } from "@/contexts/NotificationContext";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { Badge } from "@/components/ui/badge";

export default function FloatingDockDemo() {
  const { theme, setTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const languages = ["EN", "FR", "ES", "DE"];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
    console.log(`Language changed to: ${languages[nextIndex]}`);
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  const toggleSearch = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setIsAnimating(true);
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 150);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setSearchOpen(false);
        setSearchQuery("");
      }, 200);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) {
        toggleSearch();
      }
    };

    if (searchOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [searchOpen]);

  const links = [
    {
      title: "Search",
      icon: (
        <IconSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: toggleSearch,
    },
    {
      title: `Notifications ${unreadCount > 0 ? `(${unreadCount})` : ""}`,
      icon: (
        <div className="relative h-full w-full">
          <IconBell className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </div>
          )}
        </div>
      ),
      href: "#",
      onClick: toggleNotifications,
    },
    {
      title: `Language (${currentLanguage})`,
      icon: (
        <IconLanguage className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: toggleLanguage,
    },
    {
      title: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon:
        theme === "dark" ? (
          <IconSun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ) : (
          <IconMoon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
      href: "#",
      onClick: toggleTheme,
    },
    {
      title: "Logout",
      icon: (
        <IconLogout className="h-full w-full text-red-500 dark:text-red-400" />
      ),
      href: "#",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex items-center justify-end fixed top-0 z-50 backdrop-blur-2xl w-full">
      {searchOpen && (
        <div
          className={`absolute top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95"
          }`}
        >
          <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-neutral-700/50 p-4 min-w-[320px] transition-all duration-300 ease-out hover:shadow-3xl">
            <div className="flex items-center gap-3">
              <IconSearch
                className={`h-5 w-5 text-neutral-400 transition-all duration-200 ${searchQuery ? "text-blue-500 dark:text-blue-400" : ""}`}
              />
              <input
                id="search-input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-neutral-700 dark:text-neutral-200 placeholder-neutral-400 transition-all duration-200 focus:placeholder-neutral-300"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    toggleSearch();
                  }
                }}
              />
              <button
                onClick={toggleSearch}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                ✕
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                searchQuery
                  ? "max-h-20 opacity-100 mt-3"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="pt-3 border-t border-gray-200/50 dark:border-neutral-700/50">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-200">
                  Searching for: "
                  <span className="text-blue-500 dark:text-blue-400 font-medium">
                    {searchQuery}
                  </span>
                  "
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <FloatingDock mobileClassName="translate-y-20" items={links} />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
    </div>
  );
}
