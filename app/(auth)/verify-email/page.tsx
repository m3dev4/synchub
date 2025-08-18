"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyEmail, resendVerificationCode } from "@/hooks/auth/useAuth";
import { CheckCircle, Loader, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth/authState";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { pendingEmail } = useAuthStore();

  const verifyEmailMutation = verifyEmail();
  const resendCodeMutation = resendVerificationCode();

  const email = searchParams.get("email") || pendingEmail;

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...verificationCode];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/\d/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }
    setVerificationCode(newCode);
    // Focus on next empty input or last input
    const nextEmptyIndex = newCode.findIndex((code) => !code);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      toast.error("Veuillez entrer le code de vérification complet");
      return;
    }
    try {
      await verifyEmailMutation.mutateAsync(code);
      toast.success("Email vérifié avec succès!");
    } catch (error: any) {
      toast.error(error.message || "Code de vérification invalide ou expiré");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Adresse email non trouvée");
      return;
    }
    try {
      setIsResending(true);
      await resendCodeMutation.mutateAsync(email);
      toast.success("Code de vérification renvoyé avec succès!");
      // Reset verification code inputs
      setVerificationCode(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error: any) {
      toast.error(error.message || "Erreur lors du renvoi du code");
    } finally {
      setIsResending(false);
    }
  };

  const isCodeComplete = verificationCode.every((digit) => digit !== "");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center ">
        <Toaster />
        <div className="w-full max-w-md">
          <Card
            className="shadow-2xl rounded-2xl backdrop-blur-xl"
            style={{
              boxShadow: `
                0 2px 4px rgba(22, 70, 3, 0.1),
                0 4px 8px rgba(22, 70, 3, 0.15),
                0 8px 16px rgba(22, 70, 3, 0.2),
                0 16px 32px rgba(22, 70, 3, 0.25),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            <CardHeader className="space-y-4 pb-4 text-center">
              <div className="flex items-center justify-center backdrop-blur-sm rounded-full mx-auto w-16 h-16">
                <Image
                  src="/images/shlogo.png"
                  alt="logo syncHub"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-2xl tracking-tight mb-2">
                  Vérifiez votre <span className="font-semibold">email</span>
                </CardTitle>
                <CardDescription className="text-gray-500 mt-2 text-sm">
                  Nous avons envoyé un code de vérification à{" "}
                  <span className="font-medium text-blue-300">
                    {email || "votre adresse email"}{" "}
                  </span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-300">
                  Code de vérification
                </Label>
                <div className="flex gap-3 justify-center">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="animate-input w-12 h-12 text-center text-lg font-semibold  focus:border-blue-500 focus:ring-blue-800/30 rounded-xl transition-all duration-300 hover:border-gray-600 "
                      disabled={verifyEmailMutation.isPending || isResending}
                    />
                  ))}
                </div>
              </div>
              <Button
                className="submit-button w-full h-11 font-medium rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleVerify}
                disabled={!isCodeComplete || verifyEmailMutation.isPending}
              >
                {verifyEmailMutation.isPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Vérifier le code
                  </>
                )}
              </Button>
            </CardContent>
            <CardFooter>
              <div className="text-center space-y-4 flex justify-center items-center">
                <p className="text-sm text-gray-400">
                  Vous n'avez pas reçu le code ?
                </p>
                <Button
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={isResending || resendCodeMutation.isPending}
                  className="text-blue-400 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg"
                >
                  {isResending || resendCodeMutation.isPending ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Re-envoi en cours...
                    </>
                  ) : (
                    "Re-envoyer le code"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Suspense>
  );
};

export default VerifyEmail;
