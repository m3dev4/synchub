export const ForgotPasswordTemplate = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  return `<div>
    <h1>Reinitialisation de mot de passe</h1>
    <p>Vous avez demandé la reinitialisation de votre mot de passe</p>
    <p>Voici le lien de reinitialisation de votre mot de passe : <a href="http://localhost:3000/reset-password?token=${token}">http://localhost:3000/reset-password?token=${token}</a></p>
    <p>Ce lien expire dans 30 minutes</p>
    <p>Si vous n'avez pas demande la reinitialisation de votre mot de passe, ignorez ce mail</p>
    </div>`;
};
