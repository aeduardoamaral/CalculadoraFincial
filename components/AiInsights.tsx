
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
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Sparkles size={20} className="animate-pulse text-indigo-200" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Análise Estratégica IA</h3>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-2 rounded-xl transition-all text-xs font-bold shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : insight ? (
            <RefreshCcw size={16} />
          ) : (
            <Sparkles size={16} />
          )}
          {loading ? 'Processando...' : insight ? 'Recalcular Análise' : 'Gerar Insights'}
        </button>
      </div>

      {!insight && !loading && (
        <p className="text-indigo-100 text-sm italic leading-relaxed opacity-90">
          Nossa IA está pronta para analisar seus dados e fornecer recomendações personalizadas para sua saúde financeira. Clique acima para começar.
        </p>
      )}

      {loading && (
        <div className="space-y-3 pt-2">
          <div className="h-3.5 bg-white/10 rounded-full w-4/5 animate-pulse"></div>
          <div className="h-3.5 bg-white/10 rounded-full w-full animate-pulse"></div>
          <div className="h-3.5 bg-white/10 rounded-full w-2/3 animate-pulse"></div>
        </div>
      )}

      {insight && !loading && (
        <div className="text-indigo-50 leading-relaxed whitespace-pre-line text-[14px] border-t border-white/10 pt-4 mt-2">
          {insight}
        </div>
      )}
    </div>
  );
};

export default AiInsights;
