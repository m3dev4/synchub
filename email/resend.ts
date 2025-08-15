import resend from "@/config/resend.config";
import { EmailVerificationTemplate } from "@/templates/EmailVerificationTemplate";
import { ForgotPasswordTemplate } from "@/templates/forgotPasswordTemplate";

export const sendVerification = async (email: string, token: string) => {
  try {
    const { error } = await resend.emails.send({
      from: "Synchub <onboarding@resend.dev>",
      to: email,
      subject: "Verifier votre compte - Synchub",
      html: EmailVerificationTemplate({ email, token }),
    });

    if (error) {
      throw new Error("Failed to send verification email");
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendForgotPassword = async (email: string, token: string) => {
  try {
    const { error } = await resend.emails.send({
      from: "Synchub <onboarding@resend.dev>",
      to: email,
      subject: "Reinitialisation de mot de passe - Synchub",
      html: ForgotPasswordTemplate({ email, token }),
    });

    if (error) {
      throw new Error("Failed to send forgot password email");
    }
  } catch (error) {
    console.error("Error sending forgot password email:", error);
  }
};
