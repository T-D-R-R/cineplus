import { useState, useRef, useEffect } from 'react';
import { LogIn, LogOut, ShieldCheck, ChevronDown, Sparkles, Smartphone, ExternalLink, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { telegramService } from '../../services/telegram/TelegramService';

export function UserMenu() {
  const { user, isAuthenticated, openAuthModal, logout, checkAndSyncTelegram } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLinkingTelegram, setIsLinkingTelegram] = useState(false);
  const [telegramStatusMsg, setTelegramStatusMsg] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<number | null>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const handleStartTelegramLink = async () => {
    if (!user) return;
    setTelegramStatusMsg('Abriendo Telegram...');
    window.open(telegramService.getDeepLink(`link_${user.id}`), '_blank');
    setIsLinkingTelegram(true);

    if (pollingRef.current) clearInterval(pollingRef.current);

    let attempts = 0;
    pollingRef.current = window.setInterval(async () => {
      attempts++;
      setTelegramStatusMsg(`Esperando que pulses INICIAR (${30 - attempts * 2}s)...`);
      try {
        const res = await checkAndSyncTelegram();
        if (res.linked) {
          if (pollingRef.current) clearInterval(pollingRef.current);
          setIsLinkingTelegram(false);
          setTelegramStatusMsg('¡Cuenta vinculada con éxito!');
          setTimeout(() => setTelegramStatusMsg(null), 4000);
          return;
        }
      } catch {
        // Ignorar reintentos
      }

      if (attempts >= 15) {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setIsLinkingTelegram(false);
        setTelegramStatusMsg('Presiona INICIAR en el bot y vuelve a pulsar aquí.');
        setTimeout(() => setTelegramStatusMsg(null), 5000);
      }
    }, 2000);
  };

  if (!isAuthenticated || !user) {
    return (
      <button
        onClick={() => openAuthModal('login')}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 border border-amber-500/40 text-amber-300 hover:text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
        title="Iniciar Sesión o Crear Cuenta"
      >
        <LogIn className="w-4 h-4 text-amber-400" />
        <span className="hidden sm:inline">Iniciar Sesión</span>
        <span className="sm:hidden">Ingresar</span>
      </button>
    );
  }

  const getRoleIcon = () => {
    if (user.isAdmin()) {
      return <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />;
    }
    return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
  };

  const getAvatarGradient = () => {
    if (user.isAdmin()) {
      return 'from-amber-500 to-yellow-600 text-slate-950 font-black';
    }
    return 'from-indigo-500 to-purple-600 text-white font-bold';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl glass-panel hover:border-amber-500/40 transition-all cursor-pointer text-left"
        aria-expanded={isOpen}
      >
        {/* Avatar Circular con Iniciales */}
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr ${getAvatarGradient()} flex items-center justify-center text-xs shadow-md shrink-0`}
        >
          {user.getInitials()}
        </div>

        {/* Nombre y Rol (Desktop) */}
        <div className="hidden md:flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</span>
            {user.isAdmin() && (
              <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-black uppercase tracking-wider">
                Admin
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            {getRoleIcon()}
            {user.getRoleLabel()}
          </span>
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel border border-slate-800 bg-slate-900/95 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="pb-3 border-b border-slate-800/80 mb-2">
            <p className="text-xs font-bold text-white truncate">{user.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] text-amber-300 font-semibold">
              {getRoleIcon()}
              <span>{user.getRoleLabel()}</span>
            </div>
            {user.isDemo && (
              <span className="ml-1.5 inline-block text-[10px] text-slate-500 font-mono">
                (Modo Demo)
              </span>
            )}
          </div>

          <div className="space-y-1">
            {user.hasTelegramLinked() ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-sky-400 bg-sky-950/40 border border-sky-500/30">
                <ShieldCheck className="w-4 h-4 shrink-0 text-sky-400" />
                <span className="truncate">Telegram: @{user.telegramUsername || 'Conectado'}</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <button
                  onClick={handleStartTelegramLink}
                  disabled={isLinkingTelegram}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-sky-300 hover:bg-sky-500/10 hover:text-sky-200 transition-colors cursor-pointer text-left disabled:opacity-60"
                  title="Vincular con @CinePlusSeguridad_bot para recibir códigos OTP y alertas"
                >
                  <div className="flex items-center gap-2">
                    {isLinkingTelegram ? (
                      <RefreshCw className="w-4 h-4 text-sky-400 animate-spin shrink-0" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-sky-400 shrink-0" />
                    )}
                    <span>{isLinkingTelegram ? 'Comprobando...' : 'Vincular Telegram'}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400/70" />
                </button>
                {telegramStatusMsg && (
                  <p className="px-3 text-[10px] text-sky-400/90 font-medium animate-in fade-in">
                    {telegramStatusMsg}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
