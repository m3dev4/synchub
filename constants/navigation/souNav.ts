import { LockKeyhole, Settings2, User2Icon } from "lucide-react";

export const sousNavLinks = (id: string) => [
  {
    id: 1,
    title: "Mon profil",
    href: `/settings/${id}/profile`,
    icon: User2Icon,
  },
  {
    id: 2,
    title: "Général",
    href: `/settings/${id}/general`,
    icon: Settings2,
  },
  {
    id: 3,
    title: "Sécurité",
    href: `/settings/${id}/security`,
    icon: LockKeyhole,
  },
];
