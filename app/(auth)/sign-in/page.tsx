"use client";
import { signIn } from "@/hooks/auth/useAuth";
import { loginSchema, type loginType } from "@/validations/auth/authValidation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Loader, Lock, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast, Toaster } from "sonner";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const login = signIn();

  const onSubmit = async (data: loginType) => {
    try {
      setLoading(true);
      setErrorMessage("");
      await login.mutateAsync(data);
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <form
        className="w-full max-w-md space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card className="shadow-lg relative border-none outline-none bg-stone-800 w-full">
          <CardHeader className="flex flex-col items-center justify-center space-y-4 p-6">
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
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 text-center">
              Vous n'avez pas enncore un compte ?{" "}
              <Link href="/sign-up" className="text-cyan-500">
                S'inscrire
              </Link>{" "}
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full justify-center space-y-4 px-4 sm:px-6">
            {errorMessage && (
              <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                {successMessage}
              </div>
            )}
            <div className="w-full relative">
              <Input
                type="email"
                placeholder="Adresse email"
                className="w-full pl-8 pr-4 py-2"
                {...register("email")}
              />
              <MailIcon className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full relative space-y-2">
              <Input
                type="password"
                placeholder="***********"
                className="w-full pl-8 pr-4 py-2"
                {...register("password")}
              />
              <Lock className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-cyan-500 text-xs sm:text-sm hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="px-4 sm:px-6 pb-4">
            <Button
              className="w-full py-2"
              type="submit"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <Loader className="animate-spin h-4 w-4" />
              ) : (
                "Se connecter"
              )}
            </Button>
          </CardFooter>

          <div className="flex items-center gap-4 px-4 sm:px-6 mb-4">
            <div className="h-0.5 flex-1 bg-muted-foreground" />
            <p className="text-sm text-gray-400">ou</p>
            <div className="h-0.5 flex-1 bg-muted-foreground" />
          </div>

          <div className="flex items-center justify-center gap-4 px-4 sm:px-6 pb-6">
            <Button
              className="rounded-full bg-white hover:bg-gray-100 p-3"
              size="sm"
            >
              <FaGithub className="h-4 w-4 text-black" />
            </Button>
            <Button
              className="rounded-full bg-black hover:bg-gray-800 p-3"
              size="sm"
            >
              <FcGoogle className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SignIn;
