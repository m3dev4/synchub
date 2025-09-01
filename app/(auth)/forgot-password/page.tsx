"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { forgotPassword } from "@/hooks/auth/useAuth";
import {
  forgotPasswordSchema,
  forgotPasswordType,
} from "@/validations/auth/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Mail } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordApi = forgotPassword();

  const onSubmit = async (data: forgotPasswordType) => {
    try {
      setLoading(true);
      setErrorMessage("");
      await forgotPasswordApi.mutateAsync(data.email);
      setLoading(false);
      toast.success("Connexion réussie");
      setSuccessMessage("Connexion réussie, redirection en cours...");
    } catch (error: any) {
      setLoading(false);
      const errorMsg = error?.message || "Échec de la connexion";

      if (
        errorMsg.includes("Invalid credentials") ||
        errorMsg.includes("User not found")
      ) {
        setErrorMessage("Email ou mot de passe incorrect");
        toast.error("Email ou mot de passe incorrect");
      } else if (errorMsg.includes("Email not verified")) {
        setErrorMessage(
          "Veuillez vérifier votre email avant de vous connecter",
        );
        toast.error("Veuillez vérifier votre email avant de vous connecter");
      } else {
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

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
              <Mail className="absolute top-2 h-5 w-5 ml-2" />
              <Input
                className="w-full px-8"
                placeholder="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                disabled={forgotPasswordApi.isPending}
                type="submit"
              >
                {forgotPasswordApi.isPending ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  "Envoyer"
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
