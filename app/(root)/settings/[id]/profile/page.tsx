"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateUser } from "@/hooks/user/useUser";
import { useAuthStore } from "@/stores/auth/authState";
import {
  userUpdateSchema,
  userUpdateSchemaType,
} from "@/validations/user/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<userUpdateSchemaType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      description: user?.description || "",
      title: user?.title || "",
      titleProfession: user?.titleProfession || "",
      linkWebsite: user?.linkWebsite || "",
      location: user?.location || "",
    },
  });

  const updateUserMutation = updateUser();

  const onSubmit = async (data: userUpdateSchemaType) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await updateUserMutation.mutateAsync(data);
      toast.success("Mise à jour effectuer avec succées");
      setSubmitStatus({
        type: "success",
        message: "Profil mis à jour avec succès !",
      });
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Erreur lors de la mise à jour",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-2rem)]">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Toaster />
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            <User className="h-8 w-8" />
            Mon Profil
          </h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et professionnelles
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <Alert
            className={
              submitStatus.type === "success"
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
            }
          >
            {submitStatus.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={
                submitStatus.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }
            >
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    Prénom
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="Votre prénom"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Nom de famille
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="Votre nom de famille"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Nom d'utilisateur
                </Label>
                <Input
                  id="username"
                  {...register("username")}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="@votre_username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Bio / Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                  placeholder="Parlez-nous de vous..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informations professionnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Informations professionnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Titre
                  </Label>
                  <Input
                    id="title"
                    {...register("title")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="Votre titre"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="titleProfession"
                    className="text-sm font-medium"
                  >
                    Profession
                  </Label>
                  <Input
                    id="titleProfession"
                    {...register("titleProfession")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="Votre profession"
                  />
                  {errors.titleProfession && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.titleProfession.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informations de contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    <MapPin className="h-4 w-4" />
                    Localisation
                  </Label>
                  <Input
                    id="location"
                    {...register("location")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="Votre ville, pays"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="linkWebsite"
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    <Globe className="h-4 w-4" />
                    Site web
                  </Label>
                  <Input
                    id="linkWebsite"
                    {...register("linkWebsite")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="https://votre-site.com"
                  />
                  {errors.linkWebsite && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.linkWebsite.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sauvegarde...
                </div>
              ) : (
                "Sauvegarder"
              )}
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};

export default page;
