
import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCcw } from 'lucide-react';
import { getFinancialInsights } from '../services/gemini.ts';

interface AiInsightsProps {
  context: string;
}

const AiInsights: React.FC<AiInsightsProps> = ({ context }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await getFinancialInsights(context);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="animate-pulse" />
          <h3 className="font-bold text-md">Insights Estratégicos IA</h3>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg transition-colors text-[12px] font-semibold disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={14} />
          ) : insight ? (
            <RefreshCcw size={14} />
          ) : (
            <span>Analisar Dados</span>
          )}
          {loading ? 'Analisando...' : insight ? 'Recalcular' : ''}
        </button>
      </div>

      {!insight && !loading && (
        <p className="text-indigo-100 text-[12px] italic">
          Clique no botão para receber uma análise financeira personalizada sobre seus números atuais.
        </p>
      )}

      {loading && (
        <div className="space-y-2.5">
          <div className="h-3 bg-white/20 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-white/20 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-white/20 rounded w-5/6 animate-pulse"></div>
        </div>
      )}

      {insight && !loading && (
        <div className="text-indigo-50 leading-relaxed whitespace-pre-line text-[13px] border-t border-white/10 pt-3 mt-3">
          {insight}
        </div>
      )}
    </div>
  );
};

export default AiInsights;
