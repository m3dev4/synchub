"use client";
import { signIn } from "@/hooks/auth/useAuth";
import { loginSchema, loginType } from "@/validations/auth/authValidation";
import React, { useState } from "react";
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
import { Github, Loader, Lock, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      
      if (errorMsg.includes("Invalid credentials") || errorMsg.includes("User not found")) {
        setErrorMessage("Email ou mot de passe incorrect");
        toast.error("Email ou mot de passe incorrect");
      } else if (errorMsg.includes("Email not verified")) {
        setErrorMessage("Veuillez vérifier votre email avant de vous connecter");
        toast.error("Veuillez vérifier votre email avant de vous connecter");
      } else {
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Toaster />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-lg relative border-none outline-none h-[450px] w-[400px] bg-stone-800">
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
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-gray-400">
              Vous n'avez pas enncore un compte ?{" "}
              <Link href="/sign-up" className="text-cyan-500">
                S'inscrire
              </Link>{" "}
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full justify-center space-y-4">
            {errorMessage && (
              <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            <div className="w-full relative">
              <Input
                type="email"
                placeholder="Adresse email"
                className="w-full px-7"
                {...register("email")}
              />
              <MailIcon className="absolute top-2 left-1 h-5 w-5" />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full relative">
              <Input
                type="password"
                placeholder="***********"
                className="w-full px-7"
                {...register("password")}
              />
              <Lock className="absolute top-2 left-1 h-5 w-5" />
              <Link href="/auth/forgot-password" className="text-cyan-500 text-sm">
                Mot de passe oublié ?
              </Link>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={login.isPending}>
              {login.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Se connecter"
              )}
            </Button>
          </CardFooter>

          <div className="flex items-center gap-2">
            <div className="h-0.5 w-1/2 bg-muted-foreground" />
            <p>ou</p>
            <div className="h-0.5 w-1/2 bg-muted-foreground" />
          </div>

          <div className="flex items-center justify-evenly">
            <Button className="rounded-full bg-white">
              <FaGithub />
            </Button>
            <Button className="rounded-full bg-black">
              <FcGoogle />
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SignIn;
