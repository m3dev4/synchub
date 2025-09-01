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
import {
  type createUserType,
  loginSchema,
} from "@/validations/auth/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
    <div className="min-h-screen w-full bg-background">
      <Toaster />
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full gap-4 lg:gap-10 p-4">
        <div className="w-full hidden lg:block lg:w-1/2 relative order-2 lg:order-1">
          <Image
            src="/images/signiIllust.jpg"
            alt="logo syncHub"
            width={640}
            height={500}
            className="object-cover rounded-lg w-full max-w-md lg:max-w-none mx-auto"
          />
          <Link
            href="/"
            className="absolute top-2 left-2 lg:top-0 lg:left-0 lg:mt-3"
          >
            <Image
              src="/images/shlogo.png"
              alt="logo syncHub"
              width={50}
              height={50}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
          <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-full shadow-lg bg-background">
              <CardHeader className="space-y-2 px-4 sm:px-6 pt-6">
                <h2 className="text-xl sm:text-2xl font-bold text-center leading-tight">
                  Rejoignez l'aventure en vous inscrivant
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary hover:underline font-medium"
                  >
                    Se connecter
                  </Link>
                </p>
              </CardHeader>

              <CardContent className="flex flex-col space-y-4 px-4 sm:px-6">
                {errorMessage && (
                  <div className="w-full p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="w-full p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
                    {successMessage}
                  </div>
                )}

                <div className="w-full relative">
                  <Input
                    type="email"
                    placeholder="Adresse email"
                    className="w-full pl-10 pr-4 py-3 text-base"
                    {...register("email")}
                  />
                  <MailIcon className="absolute top-3.5 left-3 h-4 w-4 text-muted-foreground" />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="w-full relative">
                  <Input
                    type="password"
                    placeholder="***********"
                    className="w-full pl-10 pr-4 py-3 text-base"
                    {...register("password")}
                  />
                  <LockIcon className="absolute top-3.5 left-3 h-4 w-4 text-muted-foreground" />
                  {errors.password && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 pb-6">
                <Button
                  type="submit"
                  disabled={createUser.isPending}
                  className="w-full py-3 text-base font-medium"
                >
                  {createUser.isPending ? (
                    <Loader className="animate-spin h-4 w-4" />
                  ) : (
                    "S'inscrire"
                  )}
                </Button>

                <div className="flex items-center gap-3 w-full">
                  <div className="h-px flex-1 bg-border" />
                  <p className="text-xs text-muted-foreground">ou</p>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="flex items-center justify-center gap-4 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 border-2 bg-transparent"
                  >
                    <FaGithub className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12 border-2 bg-transparent"
                  >
                    <FcGoogle className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
