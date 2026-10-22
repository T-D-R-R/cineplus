/**
 * CinePlus - Servicio de Integración con Telegram Bot API
 * Bot Oficial: @CinePlusSeguridad_bot
 * Proporciona autenticación 2FA, envío de códigos OTP en tiempo real y alertas de seguridad.
 */

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'CinePlusSeguridad_bot';
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

export interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      first_name: string;
      username?: string;
      type: string;
    };
    date: number;
    text?: string;
  };
}

export interface TelegramLinkInfo {
  chatId: number;
  username?: string;
  firstName: string;
  linkPayload?: string;
}

export class TelegramService {
  private static instance: TelegramService;

  private constructor() {}

  public static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService();
    }
    return TelegramService.instance;
  }

  public getBotUsername(): string {
    return BOT_USERNAME;
  }

  /**
   * Genera el enlace de Deep Linking oficial de Telegram para iniciar chat con el bot
   * formato: https://t.me/CinePlusSeguridad_bot?start=<payload>
   */
  public getDeepLink(payload: string = ''): string {
    if (!payload) return `https://t.me/${BOT_USERNAME}`;
    const cleanPayload = payload.replace(/[^a-zA-Z0-9_-]/g, '_');
    return `https://t.me/${BOT_USERNAME}?start=${cleanPayload}`;
  }

  /**
   * Envía un mensaje con formato Markdown a un chat de Telegram por su chatId.
   */
  public async sendMessage(chatId: string | number, text: string): Promise<boolean> {
    try {
      const response = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();
      return Boolean(data.ok);
    } catch (err) {
      console.warn('Error al enviar mensaje a Telegram API:', err);
      return false;
    }
  }

  /**
   * Envía un código OTP de 6 dígitos con formato de seguridad premium
   */
  public async sendOtpCode(
    chatId: string | number,
    code: string,
    userName: string = 'Usuario'
  ): Promise<boolean> {
    const message = 
`🎬 *CinePlus ID — Verificación de Seguridad*

Hola *${userName}*,
Se ha solicitado el restablecimiento de tu contraseña.

🔐 Tu código de verificación OTP es:
\`${code}\`

⏳ *Vigencia:* 5 minutos.
⚠️ _Si tú no realizaste esta solicitud, ignora este mensaje y tu cuenta permanecerá protegida._`;

    return this.sendMessage(chatId, message);
  }

  /**
   * Envía una notificación de cambio de contraseña exitoso
   */
  public async sendPasswordChangedAlert(
    chatId: string | number,
    userName: string = 'Usuario'
  ): Promise<boolean> {
    const now = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    const message = 
`✅ *CinePlus ID — Contraseña Actualizada*

Hola *${userName}*,
Tu contraseña ha sido actualizada exitosamente a las ${now}.

Si reconoces esta actividad, no necesitas hacer nada. Si no fuiste tú, contacta inmediatamente a soporte técnico.`;

    return this.sendMessage(chatId, message);
  }

  /**
   * Lee las últimas actualizaciones recibidas por el bot de Telegram
   * para detectar comandos /start con payload de vinculación de cuenta.
   */
  public async pollRecentLinks(): Promise<TelegramLinkInfo[]> {
    try {
      const response = await fetch(`${TELEGRAM_API_BASE}/getUpdates?offset=-20`);
      const data = await response.json();

      if (!data.ok || !Array.isArray(data.result)) {
        return [];
      }

      const links: TelegramLinkInfo[] = [];

      for (const update of data.result as TelegramUpdate[]) {
        const msg = update.message;
        if (msg && msg.text && msg.text.startsWith('/start')) {
          const parts = msg.text.split(' ');
          const payload = parts.length > 1 ? parts[1].trim() : undefined;
          links.push({
            chatId: msg.chat.id,
            username: msg.from.username || msg.chat.username,
            firstName: msg.from.first_name || 'Usuario',
            linkPayload: payload,
          });
        }
      }

      return links;
    } catch (err) {
      console.warn('Error al consultar getUpdates de Telegram:', err);
      return [];
    }
  }

  /**
   * Envía confirmación de vinculación al usuario en Telegram
   */
  public async sendWelcomeLinkMessage(chatId: string | number, userName: string): Promise<boolean> {
    const message = 
`🎉 *¡Cuenta Vinculada con Éxito a CinePlus!*

Hola *${userName}*,
Tu cuenta ha quedado enlazada correctamente con *@${BOT_USERNAME}*.

A partir de ahora podrás:
• Recibir códigos OTP instantáneos de recuperación de contraseña.
• Alertas en tiempo real sobre inicio de sesión.
• Notificaciones del Comité de Agentes y Nuevos Estrenos.`;

    return this.sendMessage(chatId, message);
  }
}

export const telegramService = TelegramService.getInstance();
