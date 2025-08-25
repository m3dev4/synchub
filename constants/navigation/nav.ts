import { Bell, Chat, Commu, Feeds, Project } from "@/public/icons";
import { Settings, User2Icon } from "lucide-react";

import { TbBrandSafari } from "react-icons/tb";
import { FaBell } from "react-icons/fa";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { RiUserCommunityLine } from "react-icons/ri";
import { FaDiagramProject } from "react-icons/fa6";

export const navLinks = [
  {
    id: 1,
    title: "Feeds",
    href: "/feeds",
    icon: TbBrandSafari,
  },
  {
    id: 2,
    title: "Notifications",
    href: "/notifications",
    icon: FaBell,
  },
  {
    id: 3,
    title: "Messageries",
    href: "/chats",
    icon: BsChatSquareQuoteFill,
  },
  {
    id: 4,
    title: "Coummunauté",
    href: "/communauty",
    icon: RiUserCommunityLine,
  },
  {
    id: 5,
    title: "Projets",
    href: "/projects",
    icon: FaDiagramProject,
  },
];

export const navFooterLinks = [
  {
    id: 1,
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
  {
    id: 2,
    title: "Profil",
    href: "/profile",
    icon: User2Icon,
  },
];
