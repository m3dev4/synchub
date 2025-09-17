"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCommunitySchema,
  createCommunityInput,
} from "@/validations/community";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "@/components/ui/image-upload";
import { toast } from "sonner";
import { Loader2, Globe, Lock } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommunityTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const CreateCommunityModal = ({
  isOpen,
  onOpenChange,
}: CreateCommunityModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Récupération des catégories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    CommunityTag[]
  >({
    queryKey: ["community-categories"],
    queryFn: async () => {
      const response = await fetch("/api/communityTags", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Erreur lors de la récupération des catégories",
        );
      }

      return result.data || [];
    },
    staleTime: 1000 * 60 * 60, // 1 heure
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      isPrivate: false,
      customLink: "",
      avatarUrl: "",
      bannerUrl: "",
    },
  });

  const isPrivate = watch("isPrivate");

  const onSubmit = async (data: createCommunityInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/communities/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...data,
          // Nettoyer les champs optionnels vides
          avatarUrl: data.avatarUrl?.trim() || undefined,
          bannerUrl: data.bannerUrl?.trim() || undefined,
          description: data.description?.trim() || undefined,
          customLink: data.customLink?.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Erreur lors de la création de la communauté",
        );
      }

      toast.success("🎉 Communauté créée avec succès !");

      // Invalider et recharger la liste des communautés
      queryClient.invalidateQueries({ queryKey: ["communities"] });

      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Créer une nouvelle communauté
          </DialogTitle>
          <DialogDescription>
            Partagez votre passion et connectez-vous avec d&apos;autres
            passionnés dans votre domaine.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations de base */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Informations générales</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de la communauté *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Ex: React Developers France"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customLink">Lien personnalisé</Label>
                  <Input
                    id="customLink"
                    {...register("customLink")}
                    placeholder="Ex: react-dev-france"
                    className={errors.customLink ? "border-red-500" : ""}
                  />
                  <p className="text-xs text-gray-500">
                    Laissez vide pour génération automatique
                  </p>
                  {errors.customLink && (
                    <p className="text-xs text-red-500">
                      {errors.customLink.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Décrivez votre communauté, ses objectifs et ce qui la rend unique..."
                  rows={3}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Catégorie *</Label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={errors.categoryId ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {isCategoriesLoading && (
                          <div className="p-4 text-center">
                            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                            <p className="text-sm text-gray-500 mt-2">
                              Chargement...
                            </p>
                          </div>
                        )}
                        {!isCategoriesLoading &&
                          categories &&
                          categories.length > 0 && (
                            <>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  <div>
                                    <div className="font-medium">
                                      {category.name}
                                    </div>
                                    {category.description && (
                                      <div className="text-xs text-gray-500">
                                        {category.description}
                                      </div>
                                    )}
                                  </div>
                                </SelectItem>
                              ))}
                            </>
                          )}
                        {!isCategoriesLoading &&
                          (!categories || categories.length === 0) && (
                            <div className="p-4 text-center text-sm text-gray-500">
                              Aucune catégorie disponible
                            </div>
                          )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && (
                  <p className="text-xs text-red-500">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Images (optionnel)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                  name="avatarUrl"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      label="Avatar de la communauté"
                      value={field.value || ""}
                      onChange={field.onChange}
                      type="avatar"
                      disabled={isSubmitting}
                    />
                  )}
                />

                <Controller
                  name="bannerUrl"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      label="Bannière de la communauté"
                      value={field.value || ""}
                      onChange={field.onChange}
                      type="banner"
                      disabled={isSubmitting}
                    />
                  )}
                />
              </div>

              {(errors.avatarUrl || errors.bannerUrl) && (
                <div className="space-y-1">
                  {errors.avatarUrl && (
                    <p className="text-xs text-red-500">
                      {errors.avatarUrl.message}
                    </p>
                  )}
                  {errors.bannerUrl && (
                    <p className="text-xs text-red-500">
                      {errors.bannerUrl.message}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Confidentialité */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4">Confidentialité</h3>

              <Controller
                name="isPrivate"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {field.value ? (
                        <Lock className="w-5 h-5 text-red-500" />
                      ) : (
                        <Globe className="w-5 h-5 text-green-500" />
                      )}
                      <div>
                        <Label className="text-base font-medium">
                          {field.value
                            ? "Communauté privée"
                            : "Communauté publique"}
                        </Label>
                        <p className="text-sm text-gray-500">
                          {field.value
                            ? "Seuls les membres invités peuvent rejoindre"
                            : "Tout le monde peut découvrir et rejoindre cette communauté"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isCategoriesLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création en cours...
                </>
              ) : (
                "Créer la communauté"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
