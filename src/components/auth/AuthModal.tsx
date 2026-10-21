import { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Film,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../domain/User';

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalDefaultTab,
    loginWithEmail,
    registerWithEmail,
    loginAsDemo,
  } = useAuth();

  const [tab, setTab] = useState<'login' | 'register'>(authModalDefaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('usuario');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
      } else {
        if (!name.trim() || name.trim().length < 2) {
          throw new Error('El nombre debe tener al menos 2 caracteres.');
        }
        if (!email.trim() || !email.includes('@')) {
          throw new Error('Por favor ingresa un correo electrónico válido.');
        }
        if (!password || password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
        await registerWithEmail(name, email, password, role);
      }
      setSuccessMsg(tab === 'login' ? '¡Bienvenido de nuevo a CinePlus!' : '¡Cuenta creada exitosamente!');
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Ocurrió un error al procesar tu solicitud.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = async (presetRole: 'docente' | 'critico' | 'usuario') => {
    setErrorMsg(null);
    setSubmitting(true);
    try {
      await loginAsDemo(presetRole);
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Error en acceso rápido.');
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
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-amber-400 mb-3 shadow-inner">
            <Film className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">
            Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Plus</span> ID
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Inicia sesión o regístrate para publicar reseñas con tu perfil y alimentar el sistema de Machine Learning.
          </p>
        </div>

        {/* Acceso Rápido para Evaluación Docente (1-Clic) */}
        <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Acceso Rápido para Demostración (1 Clic)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('docente')}
              disabled={submitting}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-amber-500/30 text-slate-200 hover:text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer text-left"
            >
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Docente UNDAC</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('critico')}
              disabled={submitting}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 border border-rose-500/30 text-slate-200 hover:text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer text-left"
            >
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Crítico de Cine</span>
            </button>
          </div>
        </div>

        {/* Pestañas Iniciar Sesión / Registro */}
        <div className="flex rounded-xl bg-slate-950 p-1 mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
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
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              tab === 'register'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Crear Cuenta
          </button>
        </div>

        {/* Alertas */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
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

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Contraseña
            </label>
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
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Rol / Perfil de Cuenta
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                disabled={submitting}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="usuario">Cinéfilo Registrado</option>
                <option value="docente">Docente Evaluador (Académico)</option>
                <option value="critico">Crítico Cinematográfico Especialista</option>
              </select>
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

        <p className="text-[11px] text-center text-slate-500 mt-4">
          Conexión segura con Supabase Auth y persistencia idempotente.
        </p>
      </div>
    </div>
  );
}
