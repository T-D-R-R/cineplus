import { useState, useEffect } from 'react';
import { X, Key, Database, MapPin, Check, RefreshCw, Trash2, Info } from 'lucide-react';
import { getConfig, saveConfigOverrides, clearConfigOverrides } from '../../core/config';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChanged?: () => void;
}

export function ConfigModal({ isOpen, onClose, onConfigChanged }: ConfigModalProps) {
  const [tmdbKey, setTmdbKey] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [googleMapsKey, setGoogleMapsKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getConfig();
      setTmdbKey(config.tmdbApiKey);
      setSupabaseUrl(config.supabaseUrl);
      setSupabaseKey(config.supabaseAnonKey);
      setGoogleMapsKey(config.googleMapsApiKey);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveConfigOverrides({
      tmdbApiKey: tmdbKey,
      supabaseUrl,
      supabaseAnonKey: supabaseKey,
      googleMapsApiKey: googleMapsKey,
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
    setSavedSuccess(true);
    if (onConfigChanged) onConfigChanged();
    setTimeout(() => setSavedSuccess(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Configuración de Credenciales</h3>
              <p className="text-xs text-slate-400">Variables de entorno activas y sobreescrituras en vivo</p>
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
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            La aplicación lee automáticamente tu archivo <code className="text-amber-300">.env.local</code>. Si dejas
            estos campos vacíos o sin conexión, el sistema continuará funcionando en <strong>Modo Demostrativo</strong>.
          </p>
        </div>

        {/* Formulario de Claves */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-amber-400" /> TMDb API Key (v3)
            </label>
            <input
              type="password"
              placeholder="Pega aquí tu TMDb API Key (opcional)"
              value={tmdbKey}
              onChange={(e) => setTmdbKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> Supabase Project URL
              </label>
              <input
                type="text"
                placeholder="https://xxx.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> Supabase Anon Key
              </label>
              <input
                type="password"
                placeholder="eyJhbGci..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Google Maps API Key (Opcional)
            </label>
            <input
              type="password"
              placeholder="Si está vacía se activa el Modo Demo automático"
              value={googleMapsKey}
              onChange={(e) => setGoogleMapsKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Restaurar .env.local
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
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
