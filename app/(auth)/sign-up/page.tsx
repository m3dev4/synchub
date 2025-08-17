"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signUp } from "@/hooks/auth/useAuth";
import { createUserType, loginSchema } from "@/validations/auth/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "sonner";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserType>({
    resolver: zodResolver(loginSchema),
  });

  const createUser = signUp();

  const onSubmit = async (data: createUserType) => {
    try {
      setLoading(true);
      setErrorMessage("");
      await createUser.mutateAsync(data);
      setLoading(false);
      toast.success("Inscription réussie");
      setSuccessMessage("Vérifiez votre email pour activer votre compte");
    } catch (error: any) {
      setLoading(false);
      const errorMsg = error?.message || "Échec de l'inscription";
      
      if (errorMsg.includes("User already exists")) {
        setErrorMessage("Un compte avec cet email existe déjà");
        toast.error("Un compte avec cet email existe déjà");
      } else if (errorMsg.includes("Unique constraint failed")) {
        setErrorMessage("Erreur lors de la création du compte");
        toast.error("Erreur lors de la création du compte");
      } else {
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Toaster />
      <div className="flex items-center w-full gap-10">
        <div className="w-1/2">
          <Image
            src="/images/signiIllust.jpg"
            alt="logo syncHub"
            width={640}
            height={500}
            className="object-cover"
          />
         <Link href="/">
         <Image
            src="/images/shlogo.png"
            alt="logo syncHub"
            width={50}
            height={50}
            className="object-contain absolute top-0 left-0 mt-3 cursor-pointer"
          />
         </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-[400px] h-[450px] text-center shadow-lg bg-background">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                Rejoignez l'aventure en vous inscrivant
              </h2>
              <p className="text-sm text-gray-400">
                Vous avez déjà un compte ?{" "}
                <Link href="/sign-in" className="text-cyan-500">
                  Se connecter
                </Link>
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
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
                <LockIcon className="absolute top-2 left-1 h-5 w-5" />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={createUser.isPending} className="w-full">
                {createUser.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "S'inscrire"
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
    </div>
  );
};

export default SignUp;
