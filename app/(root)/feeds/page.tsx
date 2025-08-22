"use client";

import { useAuthStore } from "@/stores/auth/authState";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/hooks/auth/useAuth";

const Feeds = () => {
  const { user, isAuthenticated, hydrated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Attendre que l'hydratation soit terminée
    if (hydrated && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, hydrated, router]);

  // Afficher un loader pendant l'hydratation
  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Chargement...</div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Feeds</h1>
      <p>
        Bienvenue {user?.firtsName} {user?.lastName}
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
};

export default Feeds;
