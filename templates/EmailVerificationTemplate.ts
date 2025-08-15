export const EmailVerificationTemplate = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vérification de compte Synchub</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
            .token-box { font-size: 28px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); overflow: hidden;">
                
                <!-- Header avec gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 0; text-align: center;">
                    <div style="background-color: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 40px; height: 40px; background-color: white; border-radius: 50%; position: relative;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; background-color: #667eea; border-radius: 50%;"></div>
                      </div>
                    </div>
                    <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                      Synchub
                    </h1>
                  </td>
                </tr>
                
                <!-- Contenu principal -->
                <tr>
                  <td class="content" style="padding: 40px;">
                    <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; text-align: center;">
                      Vérifiez votre compte
                    </h2>
                    
                    <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0; text-align: center;">
                      Bonjour ! Nous avons envoyé ce code à
                    </p>
                    
                    <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 32px 0; text-align: center;">
                      ${email}
                    </p>
                    
                    <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
                      Votre code de vérification :
                    </p>
                    
                    <!-- Code de vérification stylisé -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td align="center">
                          <div class="token-box" style="
                            display: inline-block;
                            background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
                            border: 2px solid #667eea;
                            border-radius: 12px;
                            padding: 24px 32px;
                            margin: 0 0 32px 0;
                            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
                          ">
                            <span style="
                              font-size: 36px;
                              font-weight: 700;
                              color: #667eea;
                              letter-spacing: 4px;
                              font-family: 'Courier New', monospace;
                            ">${token}</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 0 0 24px 0; border-left: 4px solid #667eea;">
                      <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0;">
                        <strong>Instructions :</strong><br>
                        1. Retournez sur l'application Synchub<br>
                        2. Entrez ce code dans le champ de vérification<br>
                        3. Votre compte sera activé immédiatement
                      </p>
                    </div>
                    
                    <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0;">
                      <p style="color: #94a3b8; font-size: 14px; margin: 0 0 8px 0;">
                        ⏰ Ce code expire dans <strong>1 heure</strong>
                      </p>
                      <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                        Si vous n'avez pas demandé cette vérification, vous pouvez ignorer cet email.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0;">
                      © 2024 Synchub. Tous droits réservés.
                    </p>
                    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                      Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
