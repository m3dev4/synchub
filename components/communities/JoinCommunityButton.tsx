"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useJoinCommunity } from "@/hooks/communities/useJoinCommunity";
import { useCommunityMembership } from "@/hooks/communities/useCommunityMembership";
import { Loader2, UserPlus, UserMinus, Crown, Lock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface JoinCommunityButtonProps {
  communityId: string;
  communityName: string;
  isPrivate?: boolean;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export const JoinCommunityButton = ({
  communityId,
  communityName,
  isPrivate = false,
  className = "",
  variant = "default",
  size = "default",
}: JoinCommunityButtonProps) => {
  const { membership, isLoading: isMembershipLoading } = useCommunityMembership(communityId);
  const { joinCommunity, leaveCommunity, isJoining, isLeaving } = useJoinCommunity();

  const isLoading = isMembershipLoading || isJoining || isLeaving;

  // Si l'utilisateur est propriétaire
  if (membership?.isOwner) {
    return (
      <Badge variant="secondary" className={className}>
        <Crown className="w-3 h-3 mr-1" />
        Propriétaire
      </Badge>
    );
  }

  // Si l'utilisateur est membre
  if (membership?.isMember) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size={size}
            className={className}
            disabled={isLoading}
          >
            {isLeaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sortie...
              </>
            ) : (
              <>
                <UserMinus className="w-4 h-4 mr-2" />
                Quitter
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quitter la communauté</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir quitter <strong>{communityName}</strong> ?
              Vous perdrez l&apos;accès à tous les contenus et discussions de cette communauté.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => leaveCommunity(communityId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Quitter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Si la communauté est privée
  if (isPrivate) {
    return (
      <Button
        variant="outline"
        size={size}
        className={className}
        disabled={true}
      >
        <Lock className="w-4 h-4 mr-2" />
        Privée
      </Button>
    );
  }

  // Si l'utilisateur peut rejoindre
  if (membership?.canJoin !== false) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => joinCommunity(communityId)}
        disabled={isLoading}
      >
        {isJoining ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Adhésion...
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4 mr-2" />
            Rejoindre
          </>
        )}
      </Button>
    );
  }

  // État de chargement par défaut
  if (isMembershipLoading) {
    return (
      <Button variant="outline" size={size} className={className} disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Chargement...
      </Button>
    );
  }

  return null;
};
