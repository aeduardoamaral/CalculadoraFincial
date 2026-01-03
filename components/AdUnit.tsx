
import React, { useEffect } from 'react';

interface AdUnitProps {
  variant?: 'footer' | 'sidebar';
  slotId?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ variant = 'footer', slotId = 'DEFAULT_SLOT' }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(`Erro ao carregar Google Ad (Slot: ${slotId}):`, e);
    }
  }, [slotId]);

  if (variant === 'sidebar') {
    return (
      <div className="w-full flex-1 flex flex-col overflow-hidden bg-white rounded-xl p-2 border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 min-h-[180px]">
        <div className="text-center mb-1.5 shrink-0">
          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Publicidade</span>
        </div>
        {/* Bloco de anúncio do Google - Agora usa flex-1 para ocupar o espaço proporcional */}
        <div className="relative flex-1 bg-slate-50/50 flex items-center justify-center rounded-lg border border-dashed border-slate-200 overflow-hidden">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', height: '100%' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot={slotId}
               data-ad-format="rectangle"
               data-full-width-responsive="false"></ins>
          
          {/* Fallback visual proporcional ao espaço disponível */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 pointer-events-none p-3 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-200 mb-2 flex items-center justify-center">
               <div className="w-5 h-1 bg-slate-300 rounded-full"></div>
            </div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Espaço Publicitário</span>
            <p className="text-[7px] text-slate-300 mt-1 uppercase">Tamanho Adaptável</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-6 overflow-hidden bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
      <div className="text-center mb-1.5">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Publicidade</span>
      </div>
      <div className="min-h-[90px] bg-slate-50 rounded flex items-center justify-center relative">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <span className="absolute text-[10px] text-slate-300 uppercase font-bold pointer-events-none">Banner Publicitário</span>
      </div>
    </div>
  );
};

export default AdUnit;
