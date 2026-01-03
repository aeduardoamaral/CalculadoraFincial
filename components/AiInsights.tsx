
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
    <div className="mt-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="animate-pulse" />
          <h3 className="font-bold text-lg">Análise do Especialista IA</h3>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : insight ? (
            <RefreshCcw size={16} />
          ) : (
            <span>Gerar Insights</span>
          )}
          {loading ? 'Analisando...' : insight ? 'Atualizar' : ''}
        </button>
      </div>

      {!insight && !loading && (
        <p className="text-indigo-100 text-sm italic">
          Clique em gerar para receber uma análise personalizada baseada nos seus números.
        </p>
      )}

      {loading && (
        <div className="space-y-3">
          <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse"></div>
        </div>
      )}

      {insight && !loading && (
        <div className="text-indigo-50 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {insight}
        </div>
      )}
    </div>
  );
};

export default AiInsights;
