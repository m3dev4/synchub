"use client";
import { useCommunityById } from "@/hooks/communities/useCommunityById";
import { useAuthStore } from "@/stores/auth/authState";
import { Loader2, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
    id: string;
  };
}

const AdminLayout = ({ children, params }: AdminLayoutProps) => {
  const { community, isLoading, error } = useCommunityById(params.id);
  const { user } = useAuthStore();

  // Vérification des permissions
  useEffect(() => {
    if (community && user && community.ownerId !== user.id) {
      redirect(`/communauty/${params.slug}/${params.id}`);
    }
  }, [community, user, params.slug, params.id]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement du panel admin...</p>
        </div>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Accès refusé</h2>
          <p className="text-muted-foreground mb-4">
            Vous n&apos;avez pas les permissions pour accéder à cette page.
          </p>
          <Button asChild>
            <Link href={`/communauty/${params.slug}/${params.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la communauté
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Vérifier si l'utilisateur est propriétaire
  if (community.ownerId !== user?.id) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Accès refusé</h2>
          <p className="text-muted-foreground mb-4">
            Seul le propriétaire de la communauté peut accéder au panel d&apos;administration.
          </p>
          <Button asChild>
            <Link href={`/communauty/${params.slug}/${params.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la communauté
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/communauty/${params.slug}/${params.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Link>
              </Button>

              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold">Panel d&apos;administration</h1>
                  <p className="text-sm text-muted-foreground">
                    Gestion de {community.name}
                  </p>
                </div>
              </div>
            </div>

            <Badge variant="secondary" className="gap-1">
              <Shield className="w-3 h-3" />
              Propriétaire
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Admin */}
        <AdminSidebar communityId={community.id} />

        {/* Contenu principal */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
