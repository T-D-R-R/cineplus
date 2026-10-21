import { useState, useEffect } from 'react';
import { X, Key, Database, MapPin, Check, RefreshCw, Trash2, Info, Bot, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { getConfig, saveConfigOverrides, clearConfigOverrides } from '../../core/config';
import { useAuth } from '../../context/AuthContext';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChanged?: () => void;
}

export function ConfigModal({ isOpen, onClose, onConfigChanged }: ConfigModalProps) {
  const { user } = useAuth();

  const [tmdbKey, setTmdbKey] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [googleMapsKey, setGoogleMapsKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [openrouterKey, setOpenrouterKey] = useState('');
  const [grokKey, setGrokKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Estados individuales para mostrar/ocultar cada API key
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (keyName: string) => {
    setVisibleKeys((prev) => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  useEffect(() => {
    if (isOpen) {
      const config = getConfig();
      setTmdbKey(config.tmdbApiKey);
      setSupabaseUrl(config.supabaseUrl);
      setSupabaseKey(config.supabaseAnonKey);
      setGoogleMapsKey(config.googleMapsApiKey);
      setGeminiKey(config.geminiApiKey);
      setOpenrouterKey(config.openrouterApiKey);
      setGrokKey(config.grokApiKey);
      setSavedSuccess(false);
      setVisibleKeys({});
    }
  }, [isOpen]);

  // Si no está abierto o el usuario no es administrador, no renderizar nada
  if (!isOpen || !user?.isAdmin()) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveConfigOverrides({
      tmdbApiKey: tmdbKey,
      supabaseUrl,
      supabaseAnonKey: supabaseKey,
      googleMapsApiKey: googleMapsKey,
      geminiApiKey: geminiKey,
      openrouterApiKey: openrouterKey,
      grokApiKey: grokKey,
    });
    setSavedSuccess(true);
    if (onConfigChanged) onConfigChanged();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    clearConfigOverrides();
    const config = getConfig();
    setTmdbKey(config.tmdbApiKey);
    setSupabaseUrl(config.supabaseUrl);
    setSupabaseKey(config.supabaseAnonKey);
    setGoogleMapsKey(config.googleMapsApiKey);
    setGeminiKey(config.geminiApiKey);
    setOpenrouterKey(config.openrouterApiKey);
    setGrokKey(config.grokApiKey);
    setSavedSuccess(true);
    if (onConfigChanged) onConfigChanged();
    setTimeout(() => setSavedSuccess(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 bg-slate-900/95 max-h-[90vh] overflow-y-auto">
        {/* Cabecera con Insignia de Seguridad */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Panel de APIs y Credenciales</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Exclusivo Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">Variables de entorno protegidas y sobreescrituras en caliente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notificación informativa */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            Por seguridad, las claves están <strong>enmascaradas</strong>. Pulsa el icono del ojo (👁️) para inspeccionarlas o modificarlas. Si dejas algún campo vacío, continuará en <strong>Modo Demostrativo</strong>.
          </p>
        </div>

        {/* Formulario de Claves */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* TMDb */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-amber-400" /> TMDb API Key (v3)
              </span>
              <button
                type="button"
                onClick={() => toggleKeyVisibility('tmdb')}
                className="text-slate-400 hover:text-amber-300 text-xs flex items-center gap-1 cursor-pointer"
              >
                {visibleKeys.tmdb ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{visibleKeys.tmdb ? 'Ocultar' : 'Mostrar'}</span>
              </button>
            </label>
            <input
              type={visibleKeys.tmdb ? 'text' : 'password'}
              placeholder="Pega aquí tu TMDb API Key"
              value={tmdbKey}
              onChange={(e) => setTmdbKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-500 font-mono transition-colors"
            />
          </div>

          {/* Supabase URL & Key */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> Supabase URL
              </label>
              <input
                type="text"
                placeholder="https://xxx.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-emerald-400" /> Supabase Anon Key
                </span>
                <button
                  type="button"
                  onClick={() => toggleKeyVisibility('supabase')}
                  className="text-slate-400 hover:text-emerald-300 text-xs flex items-center gap-1 cursor-pointer"
                >
                  {visibleKeys.supabase ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </label>
              <input
                type={visibleKeys.supabase ? 'text' : 'password'}
                placeholder="eyJhbGci..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 font-mono transition-colors"
              />
            </div>
          </div>

          {/* Google Maps */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Google Maps API Key
              </span>
              <button
                type="button"
                onClick={() => toggleKeyVisibility('maps')}
                className="text-slate-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer"
              >
                {visibleKeys.maps ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </label>
            <input
              type={visibleKeys.maps ? 'text' : 'password'}
              placeholder="Si está vacía se activa el Modo Demo automático"
              value={googleMapsKey}
              onChange={(e) => setGoogleMapsKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-rose-500 font-mono transition-colors"
            />
          </div>

          {/* Gemini */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-indigo-400" /> Google Gemini API Key
              </span>
              <button
                type="button"
                onClick={() => toggleKeyVisibility('gemini')}
                className="text-slate-400 hover:text-indigo-300 text-xs flex items-center gap-1 cursor-pointer"
              >
                {visibleKeys.gemini ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </label>
            <input
              type={visibleKeys.gemini ? 'text' : 'password'}
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 font-mono transition-colors"
            />
          </div>

          {/* OpenRouter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-emerald-400" /> OpenRouter API Key
              </span>
              <button
                type="button"
                onClick={() => toggleKeyVisibility('openrouter')}
                className="text-slate-400 hover:text-emerald-300 text-xs flex items-center gap-1 cursor-pointer"
              >
                {visibleKeys.openrouter ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </label>
            <input
              type={visibleKeys.openrouter ? 'text' : 'password'}
              placeholder="sk-or-v1-..."
              value={openrouterKey}
              onChange={(e) => setOpenrouterKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 font-mono transition-colors"
            />
          </div>

          {/* Grok */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-amber-400" /> xAI Grok API Key
              </span>
              <button
                type="button"
                onClick={() => toggleKeyVisibility('grok')}
                className="text-slate-400 hover:text-amber-300 text-xs flex items-center gap-1 cursor-pointer"
              >
                {visibleKeys.grok ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </label>
            <input
              type={visibleKeys.grok ? 'text' : 'password'}
              placeholder="xai-..."
              value={grokKey}
              onChange={(e) => setGrokKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-500 font-mono transition-colors"
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-950 border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Restaurar .env.local
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" /> Guardado
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" /> Aplicar Cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
