"use client";

import { useAuthStore } from "@/stores/auth/authState";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/hooks/auth/useAuth";

const Feeds = () => {
  const { user, isAuthenticated, hydrated, logout } = useAuthStore();
  const router = useRouter();

  return (
    <div>
      <h1>Feeds</h1>
    </div>
  );
};

export default Feeds;
