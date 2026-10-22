import { useState, useEffect } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  Film,
  AlertCircle,
  CheckCircle2,
  Smartphone,
  KeyRound,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Send,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { telegramService } from '../../services/telegram/TelegramService';

type ResetStep = 'identify' | 'select-channel' | 'verify-otp' | 'new-password' | 'success';

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalDefaultTab,
    loginWithEmail,
    registerWithEmail,
    requestPasswordReset,
    sendOtpViaTelegram,
    sendOtpViaEmail,
    verifyOtp,
    resetPassword,
    isRecoveryMode,
    setIsRecoveryMode,
  } = useAuth();

  const [tab, setTab] = useState<'login' | 'register' | 'forgot-password'>(authModalDefaultTab);
  
  // Estados para Login y Registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Estados para Recuperación de Contraseña
  const [resetStep, setResetStep] = useState<ResetStep>(isRecoveryMode ? 'new-password' : 'identify');
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [resetUserEmail, setResetUserEmail] = useState('');
  const [resetUserName, setResetUserName] = useState('');
  const [resetHasTelegram, setResetHasTelegram] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [simulationCodeNotice, setSimulationCodeNotice] = useState<string | null>(null);

  // Estados comunes
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(
    isRecoveryMode ? 'Enlace de correo verificado. Ingresa tu nueva contraseña a continuación.' : null
  );

  // Sincronizar y limpiar campos al abrir el modal
  useEffect(() => {
    if (isAuthModalOpen) {
      setTab(authModalDefaultTab);
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setResetIdentifier('');
      setResetUserEmail('');
      setResetUserName('');
      setErrorMsg(null);
      setSuccessMsg(isRecoveryMode ? 'Enlace de correo verificado. Ingresa tu nueva contraseña a continuación.' : null);
      setResetStep(isRecoveryMode ? 'new-password' : 'identify');
      setOtpCode('');
      setNewPassword('');
      setConfirmPassword('');
      setSimulationCodeNotice(null);
    }
  }, [isAuthModalOpen, authModalDefaultTab, isRecoveryMode]);

  if (!isAuthModalOpen) return null;

  // Manejar Login / Registro
  const handleSubmitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      if (tab === 'login') {
        if (!email.trim() || !password.trim()) {
          throw new Error('Por favor completa tu correo y contraseña.');
        }
        await loginWithEmail(email, password);
        setEmail('');
        setPassword('');
        setSuccessMsg('¡Bienvenido de nuevo a CinePlus!');
      } else if (tab === 'register') {
        if (!name.trim() || name.trim().length < 2) {
          throw new Error('El nombre debe tener al menos 2 caracteres.');
        }
        if (!email.trim() || !email.includes('@')) {
          throw new Error('Por favor ingresa un correo electrónico válido.');
        }
        if (!password || password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
        await registerWithEmail(name, email, password, phone);
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setSuccessMsg('¡Cuenta de Cinéfilo creada exitosamente!');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Ocurrió un error al procesar tu solicitud.');
    } finally {
      setSubmitting(false);
    }
  };

  // Paso 1: Identificar usuario para recuperación
  const handleIdentifyUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      if (!resetIdentifier.trim()) {
        throw new Error('Por favor ingresa tu correo electrónico registrado.');
      }
      const res = await requestPasswordReset(resetIdentifier);
      setResetUserEmail(res.email);
      setResetUserName(res.user.name);
      setResetHasTelegram(res.hasTelegram);
      setResetStep('select-channel');
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'No se pudo verificar la cuenta.');
    } finally {
      setSubmitting(false);
    }
  };

  // Paso 2A: Enviar por Telegram
  const handleSendTelegramOtp = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);
    setSimulationCodeNotice(null);

    try {
      const res = await sendOtpViaTelegram(resetUserEmail);
      if (res.otpSent) {
        setSuccessMsg(res.message);
        setResetStep('verify-otp');
      } else if (res.deepLink) {
        // Abrir Deep link de Telegram en nueva pestaña
        window.open(res.deepLink, '_blank');
        setSuccessMsg('Se abrió el bot de Telegram en una nueva pestaña. Presiona INICIAR en Telegram y luego haz clic en "Verificar Código".');
        setResetStep('verify-otp');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Error al conectar con Telegram.');
    } finally {
      setSubmitting(false);
    }
  };

  // Paso 2B: Enviar por Correo Electrónico
  const handleSendEmailOtp = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      const res = await sendOtpViaEmail(resetUserEmail);
      if (res.isSimulation && res.simulationCode) {
        setSimulationCodeNotice(res.simulationCode);
        setSuccessMsg('Límite SMTP detectado (Capa Free de Supabase). Modo de contingencia académica activo: tu código de verificación se muestra a continuación.');
      } else {
        setSuccessMsg(res.message);
      }
      setResetStep('verify-otp');
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Error al enviar por correo.');
    } finally {
      setSubmitting(false);
    }
  };

  // Paso 3: Validar código OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (!otpCode.trim() || otpCode.trim().length !== 6) {
        throw new Error('El código OTP debe ser exactamente de 6 dígitos.');
      }
      verifyOtp(resetUserEmail, otpCode);
      setSuccessMsg('Código OTP verificado correctamente.');
      setResetStep('new-password');
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Código OTP inválido.');
    }
  };

  // Paso 4: Guardar nueva contraseña
  const handleSaveNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      if (!newPassword || newPassword.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres.');
      }
      if (newPassword !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden. Por favor verifícalas.');
      }

      if (isRecoveryMode) {
        await resetPassword(resetUserEmail || 'recovery', newPassword, 'supabase_recovery');
        setIsRecoveryMode(false);
        if (typeof window !== 'undefined' && window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      } else {
        await resetPassword(resetUserEmail, newPassword, otpCode);
      }
      setSuccessMsg('¡Contraseña actualizada exitosamente! Ahora puedes iniciar sesión con tu nueva contraseña.');
      setResetStep('success');
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Error al actualizar la contraseña.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-panel w-full max-w-md rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-7 relative overflow-hidden bg-slate-900/95"
        role="dialog"
        aria-modal="true"
      >
        {/* Adorno superior decorativo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500" />

        {/* Botón Cerrar */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-5 pt-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-amber-400 mb-2 shadow-inner">
            <Film className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">
            Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Plus</span> ID
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {tab === 'login' && 'Ingresa con tu correo y contraseña para acceder a la plataforma.'}
            {tab === 'register' && 'Crea tu cuenta de Cinéfilo para calificar películas y debatir reseñas.'}
            {tab === 'forgot-password' && 'Restablecimiento seguro de contraseña y verificación multifactor.'}
          </p>
        </div>

        {/* Pestañas (Solo si no estamos en forgot-password) */}
        {tab !== 'forgot-password' ? (
          <div className="flex rounded-xl bg-slate-950 p-1 mb-5 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                tab === 'login'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                tab === 'register'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Crear Cuenta
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setErrorMsg(null);
                setSuccessMsg(null);
                setResetStep('identify');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver a Iniciar Sesión
            </button>
          </div>
        )}

        {/* Alertas */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VISTA 1 & 2: LOGIN Y REGISTRO                                */}
        {/* ------------------------------------------------------------- */}
        {tab !== 'forgot-password' && (
          <form onSubmit={handleSubmitAuth} className="space-y-3.5">
            {tab === 'register' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Ej: Daniel Alcides"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitting}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="tu_correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Celular / WhatsApp <span className="text-slate-500 font-normal lowercase">(opcional)</span>
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="Ej: 987654321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={submitting}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Contraseña
                </label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setTab('forgot-password');
                      setResetStep('identify');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                      if (email) setResetIdentifier(email);
                    }}
                    className="text-[11px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder={tab === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {tab === 'register' && (
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Tu cuenta se registrará con perfil de <strong>Cinéfilo</strong> para publicar reseñas y explorar cartelera.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <span>Procesando...</span>
              ) : tab === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" /> Ingresar a mi Cuenta
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Completar Registro
                </>
              )}
            </button>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VISTA 3: RECUPERACIÓN DE CONTRASEÑA MULTIPASO                */}
        {/* ------------------------------------------------------------- */}
        {tab === 'forgot-password' && (
          <div className="space-y-4">
            {/* PASO 1: Identificar usuario */}
            {resetStep === 'identify' && (
              <form onSubmit={handleIdentifyUser} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Correo Electrónico Registrado
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="tu_correo@ejemplo.com"
                      value={resetIdentifier}
                      onChange={(e) => setResetIdentifier(e.target.value)}
                      disabled={submitting}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    El sistema comprobará la existencia de la cuenta en la base de datos antes de generar el código.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Verificando...' : 'Buscar Cuenta y Continuar'}
                </button>
              </form>
            )}

            {/* PASO 2: Seleccionar canal (Telegram o Correo) */}
            {resetStep === 'select-channel' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-xs text-slate-400">Cuenta verificada:</p>
                  <p className="text-sm font-bold text-white truncate">{resetUserName}</p>
                  <p className="text-xs font-mono text-amber-400">{resetUserEmail}</p>
                </div>

                <p className="text-xs text-slate-300 font-semibold">
                  Selecciona el método para recibir tu código OTP:
                </p>

                {/* Opción 1: Telegram */}
                <button
                  type="button"
                  onClick={handleSendTelegramOtp}
                  disabled={submitting}
                  className="w-full p-3.5 rounded-2xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/30 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-sky-300 group-hover:text-sky-200 flex items-center gap-1.5">
                          Bot de Telegram (@{telegramService.getBotUsername()})
                          {resetHasTelegram && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Enlazado
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {resetHasTelegram
                            ? 'Envío instantáneo de código OTP a tu Telegram.'
                            : 'Abre el bot, presiona Iniciar y recibe tu código al segundo.'}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sky-400 shrink-0 opacity-70 group-hover:opacity-100" />
                  </div>
                </button>

                {/* Opción 2: Correo Electrónico */}
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={submitting}
                  className="w-full p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/60 border border-slate-700/60 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                        Correo Electrónico Tradicional
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Enlace de Supabase Auth (o código de contingencia académica).
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* PASO 3: Ingresar código OTP */}
            {resetStep === 'verify-otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                {simulationCodeNotice && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      Código de Contingencia Académica (Cuota SMTP):
                    </div>
                    <p className="font-mono text-base font-black text-center tracking-[0.25em] bg-slate-950 py-1.5 rounded-xl border border-amber-500/30 text-amber-400 my-1">
                      {simulationCodeNotice}
                    </p>
                    <p className="text-[10px] text-slate-400 text-center">
                      Ingresa este código a continuación para validar la propiedad de la cuenta.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1 text-center">
                    Ingresa el Código OTP (6 dígitos)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center text-xl font-mono tracking-[0.4em] py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-500 text-center mt-1.5">
                    El código tiene una validez de 5 minutos.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" /> Verificar Código OTP
                </button>

                <div className="flex flex-col items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleSendTelegramOtp}
                    disabled={submitting}
                    className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
                  >
                    <Send className="w-3.5 h-3.5" /> {submitting ? 'Enviando a Telegram...' : '📲 Reenviar código a mi Telegram'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetStep('select-channel')}
                    className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Cambiar método de envío
                  </button>
                </div>
              </form>
            )}

            {/* PASO 4: Nueva Contraseña */}
            {resetStep === 'new-password' && (
              <form onSubmit={handleSaveNewPassword} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={submitting}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Confirmar Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="Repite la contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={submitting}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Actualizando...' : 'Guardar Nueva Contraseña'}
                </button>
              </form>
            )}

            {/* PASO 5: Éxito */}
            {resetStep === 'success' && (
              <div className="text-center py-2 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">¡Credenciales Restablecidas!</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tu contraseña ha sido actualizada con éxito en la base de datos de CinePlus.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setEmail(resetUserEmail);
                    setPassword('');
                    setErrorMsg(null);
                    setSuccessMsg('Ingresa tu nueva contraseña para acceder.');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-all cursor-pointer"
                >
                  Ir a Iniciar Sesión
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-[11px] text-center text-slate-500 mt-5">
          CinePlus ID • Arquitectura de Autenticación RBAC y Protección OTP Multicanal
        </p>
      </div>
    </div>
  );
}
