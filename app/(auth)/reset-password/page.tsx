"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { resetPassword } from "@/hooks/auth/useAuth";
import {
  resetPasswordSchema,
  resetPasswordType,
} from "@/validations/auth/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPasswordApi = resetPassword();

  const onSubmit = async (data: resetPasswordType) => {
    try {
      if (!token) {
        setErrorMessage("Le token est manquant");
        return;
      }
      setErrorMessage("");
      setLoading(true);
      await resetPasswordApi.mutateAsync({ newPassword: data.password, token });
      setLoading(false);
      toast.success("Mot de passe modifié avec succès");
      setSuccessMessage(
        "Mot de passe modifié avec succès, redirection en cours...",
      );
    } catch (error) {
      console.log("Error", error);
      toast.error("Une erreur est survenue");
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Erreur de réinitialisation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                Le token de réinitialisation est manquant ou expiré
              </AlertDescription>
            </Alert>
            <div className="mt-6">
              <Link
                href="/forgot-password"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Demander un nouveau lien de réinitialisation
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen">
      <Toaster />
      <div className="flex flex-col h-screen items-center justify-center space-y-4">
        <form
          className="w-full max-w-md space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card className="shadow-lg relative border-none outline-none bg-stone-800 h-80 w-80">
            <CardHeader className="flex flex-col items-center justify-center">
              <div className="h-11 w-11 rounded-full bg-background">
                <Image
                  src="/images/shlogo.png"
                  alt="logo syncHub"
                  width={100}
                  height={100}
                  className="object-cover mt-1"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-center">
                Veuillez spécifier votre email ci-dessous
              </h2>
            </CardHeader>
            <CardContent className="relative">
              <Input
                className="w-full"
                type="password"
                placeholder="Nouveau mot de passe"
                {...register("password")}
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                type="submit"
                disabled={resetPasswordApi.isPending}
              >
                {resetPasswordApi.isPending ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  "Modifier le mot de passe"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default page;
