"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search, UserPlus, Crown, Edit, Eye, Users } from "lucide-react";
import { CollaboratorRole } from "@/types/posts";
import { toast } from "sonner";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarPicture?: string;
}

interface Collaborator extends User {
  role: CollaboratorRole;
}

interface CollaboratorSelectorProps {
  collaborators: Collaborator[];
  onCollaboratorsChange: (collaborators: Collaborator[]) => void;
  currentUserId: string;
  className?: string;
}

export const CollaboratorSelector: React.FC<CollaboratorSelectorProps> = ({
  collaborators,
  onCollaboratorsChange,
  currentUserId,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const roleIcons = {
    OWNER: Crown,
    EDITOR: Edit,
    CONTRIBUTOR: UserPlus,
    VIEWER: Eye,
  };

  const roleLabels = {
    OWNER: "Propriétaire",
    EDITOR: "Éditeur",
    CONTRIBUTOR: "Contributeur",
    VIEWER: "Lecteur",
  };

  const roleColors = {
    OWNER: "bg-yellow-100 text-yellow-800",
    EDITOR: "bg-blue-100 text-blue-800",
    CONTRIBUTOR: "bg-green-100 text-green-800",
    VIEWER: "bg-gray-100 text-gray-800",
  };

  // Recherche d'utilisateurs
  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/users/search?q=${encodeURIComponent(query)}`,
      );
      if (response.ok) {
        const users = await response.json();
        // Filtrer les utilisateurs déjà collaborateurs
        const filtered = users.filter(
          (user: User) =>
            !collaborators.some((collab) => collab.id === user.id) &&
            user.id !== currentUserId,
        );
        setSearchResults(filtered);
      }
    } catch (error) {
      console.error("Erreur recherche utilisateurs:", error);
      toast.error("Erreur lors de la recherche");
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchUsers(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const addCollaborator = (
    user: User,
    role: CollaboratorRole = "CONTRIBUTOR",
  ) => {
    const newCollaborator: Collaborator = { ...user, role };
    onCollaboratorsChange([...collaborators, newCollaborator]);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
    toast.success(
      `${user.firstName} ${user.lastName} ajouté comme ${roleLabels[role].toLowerCase()}`,
    );
  };

  const removeCollaborator = (userId: string) => {
    const collaborator = collaborators.find((c) => c.id === userId);
    onCollaboratorsChange(collaborators.filter((c) => c.id !== userId));
    if (collaborator) {
      toast.success(
        `${collaborator.firstName} ${collaborator.lastName} retiré de la collaboration`,
      );
    }
  };

  const updateCollaboratorRole = (
    userId: string,
    newRole: CollaboratorRole,
  ) => {
    const updated = collaborators.map((c) =>
      c.id === userId ? { ...c, role: newRole } : c,
    );
    onCollaboratorsChange(updated);

    const collaborator = collaborators.find((c) => c.id === userId);
    if (collaborator) {
      toast.success(
        `Rôle de ${collaborator.firstName} mis à jour: ${roleLabels[newRole]}`,
      );
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          <h3 className="text-sm font-medium">Collaboration</h3>
          {collaborators.length > 0 && (
            <Badge variant="secondary">{collaborators.length}</Badge>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center gap-1"
        >
          <UserPlus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {/* Zone de recherche */}
      {showSearch && (
        <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher des utilisateurs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Résultats de recherche */}
          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 bg-white rounded border"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarPicture} />
                      <AvatarFallback className="text-xs">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue="CONTRIBUTOR"
                      onValueChange={(role) =>
                        addCollaborator(user, role as CollaboratorRole)
                      }
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EDITOR">Éditeur</SelectItem>
                        <SelectItem value="CONTRIBUTOR">
                          Contributeur
                        </SelectItem>
                        <SelectItem value="VIEWER">Lecteur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !isSearching && (
            <p className="text-sm text-gray-500 text-center py-2">
              Aucun utilisateur trouvé
            </p>
          )}
        </div>
      )}

      {/* Liste des collaborateurs */}
      {collaborators.length > 0 && (
        <div className="space-y-2">
          {collaborators.map((collaborator) => {
            const RoleIcon = roleIcons[collaborator.role];
            return (
              <div
                key={collaborator.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={collaborator.avatarPicture} />
                    <AvatarFallback>
                      {getInitials(
                        collaborator.firstName,
                        collaborator.lastName,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {collaborator.firstName} {collaborator.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      @{collaborator.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    className={`flex items-center gap-1 ${roleColors[collaborator.role]}`}
                  >
                    <RoleIcon className="h-3 w-3" />
                    {roleLabels[collaborator.role]}
                  </Badge>

                  {collaborator.role !== "OWNER" && (
                    <div className="flex items-center gap-1">
                      <Select
                        value={collaborator.role}
                        onValueChange={(role) =>
                          updateCollaboratorRole(
                            collaborator.id,
                            role as CollaboratorRole,
                          )
                        }
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EDITOR">Éditeur</SelectItem>
                          <SelectItem value="CONTRIBUTOR">
                            Contributeur
                          </SelectItem>
                          <SelectItem value="VIEWER">Lecteur</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCollaborator(collaborator.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info sur les rôles */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>
          <strong>Éditeur:</strong> Peut modifier le contenu et gérer les
          collaborateurs
        </p>
        <p>
          <strong>Contributeur:</strong> Peut modifier le contenu
        </p>
        <p>
          <strong>Lecteur:</strong> Peut seulement voir le contenu
        </p>
      </div>
    </div>
  );
};
