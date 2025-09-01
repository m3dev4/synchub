import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth/authState";
import { toast } from "sonner";

interface FollowStatus {
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
}

export const useFollow = (userId: string) => {
  const { user } = useAuthStore();
  const [followStatus, setFollowStatus] = useState<FollowStatus>({
    isFollowing: false,
    followersCount: 0,
    followingCount: 0,
  });
  const [loading, setLoading] = useState(false);

  // Récupérer le statut de suivi
  const fetchFollowStatus = async () => {
    if (!user?.id || !userId) return;

    try {
      const response = await fetch(`/api/follow/status/${userId}`, {
        headers: {
          "x-user-id": user.id,
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFollowStatus({
          isFollowing: result.isFollowing,
          followersCount: result.followersCount,
          followingCount: result.followingCount,
        });
      }
    } catch (error) {
      console.error("Error fetching follow status:", error);
    }
  };

  // Follow un utilisateur
  const followUser = async () => {
    if (!user?.id || !userId || loading) return;

    setLoading(true);
    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ followingId: userId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFollowStatus((prev) => ({
          ...prev,
          isFollowing: true,
          followersCount: prev.followersCount + 1,
        }));
        toast.success("Utilisateur suivi avec succès");
      } else {
        toast.error(result.error || "Erreur lors du suivi");
      }
    } catch (error) {
      console.error("Error following user:", error);
      toast.error("Erreur lors du suivi");
    } finally {
      setLoading(false);
    }
  };

  // Unfollow un utilisateur
  const unfollowUser = async () => {
    if (!user?.id || !userId || loading) return;

    setLoading(true);
    try {
      const response = await fetch("/api/follow", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ followingId: userId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFollowStatus((prev) => ({
          ...prev,
          isFollowing: false,
          followersCount: Math.max(0, prev.followersCount - 1),
        }));
        toast.success("Utilisateur non suivi");
      } else {
        toast.error(result.error || "Erreur lors de l'arrêt du suivi");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("Erreur lors de l'arrêt du suivi");
    } finally {
      setLoading(false);
    }
  };

  // Toggle follow/unfollow
  const toggleFollow = () => {
    if (followStatus.isFollowing) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  useEffect(() => {
    fetchFollowStatus();
  }, [user?.id, userId]);

  return {
    ...followStatus,
    loading,
    followUser,
    unfollowUser,
    toggleFollow,
    refetch: fetchFollowStatus,
  };
};
