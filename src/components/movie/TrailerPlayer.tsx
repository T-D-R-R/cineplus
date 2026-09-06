import { Play, AlertCircle } from 'lucide-react';

interface TrailerPlayerProps {
  trailerUrl: string | null;
  title: string;
}

export function TrailerPlayer({ trailerUrl, title }: TrailerPlayerProps) {
  return (
    <section className="space-y-4" id="seccion-trailer">
      <div className="flex items-center gap-2">
        <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
        <h3 className="text-xl font-bold text-white">Tráiler Oficial</h3>
      </div>

      <div className="rounded-3xl overflow-hidden glass-panel border border-slate-800 p-2 sm:p-4 shadow-2xl">
        {trailerUrl ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
            <iframe
              src={trailerUrl}
              title={`Tráiler oficial de ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="aspect-video w-full rounded-2xl bg-slate-900/90 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-500" />
            <p className="text-slate-400 text-sm font-medium">
              El tráiler oficial no se encuentra disponible actualmente en los servidores de TMDb.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
