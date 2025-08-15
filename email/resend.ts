import resend from "@/config/resend.config";
import { EmailVerificationTemplate } from "@/templates/EmailVerificationTemplate";

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
