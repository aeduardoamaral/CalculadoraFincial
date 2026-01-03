
import React, { useState, useMemo } from 'react';
import { Target, TrendingUp, Calendar, ArrowRightCircle } from 'lucide-react';
import { SavingsGoalData } from '../types.ts';
import AiInsights from './AiInsights.tsx';

const SavingsGoalCalc: React.FC = () => {
  const [data, setData] = useState<SavingsGoalData>({
    targetAmount: 50000,
    currentSavings: 2000,
    annualRate: 8,
    timeframeMonths: 24
  });

  const results = useMemo(() => {
    const r = data.annualRate / 100 / 12;
    const n = data.timeframeMonths;
    const fv = data.targetAmount;
    const pv = data.currentSavings;

    let requiredMonthly: number;
    if (r === 0) {
      requiredMonthly = (fv - pv) / n;
    } else {
      const futureValuePv = pv * Math.pow(1 + r, n);
      requiredMonthly = (fv - futureValuePv) * r / (Math.pow(1 + r, n) - 1);
    }

    return {
      requiredMonthly: Math.max(0, requiredMonthly),
      isPossible: requiredMonthly > 0
    };
  }, [data]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const aiContext = `Simulação de Meta de Economia:
    Meta Alvo: ${formatCurrency(data.targetAmount)}
    Saldo Atual: ${formatCurrency(data.currentSavings)}
    Rentabilidade Esperada: ${data.annualRate}% aa
    Prazo: ${data.timeframeMonths} meses
    Investimento Mensal Necessário: ${formatCurrency(results.requiredMonthly)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-md font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Target size={20} className="text-indigo-600" /> Planejamento de Metas
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Quanto você quer atingir?</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.targetAmount}
                  onChange={(e) => setData({...data, targetAmount: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Já possui quanto guardado?</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.currentSavings}
                  onChange={(e) => setData({...data, currentSavings: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Rendimento (%)</label>
                <input 
                  type="number"
                  step="0.1"
                  value={data.annualRate}
                  onChange={(e) => setData({...data, annualRate: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Meses</label>
                <input 
                  type="number"
                  value={data.timeframeMonths}
                  onChange={(e) => setData({...data, timeframeMonths: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
          <TrendingUp className="absolute -right-6 -bottom-6 text-emerald-500 opacity-20" size={130} />
          <div className="relative z-10">
            <span className="text-emerald-100 text-[11px] font-bold uppercase tracking-widest block mb-2">Aporte Mensal Necessário</span>
            <span className="text-3xl font-bold">{formatCurrency(results.requiredMonthly)}</span>
            <p className="mt-3 text-emerald-50 text-[12px] leading-relaxed">
              Valor aproximado para chegar aos <strong>{formatCurrency(data.targetAmount)}</strong> no prazo desejado.
            </p>
          </div>
        </div>
      </div>

      {/* Visuals / Comparison */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-center min-h-[240px]">
           <h4 className="text-slate-800 text-sm font-bold mb-8 flex items-center gap-2">
             <Calendar size={18} className="text-indigo-600" /> Jornada Financeira
           </h4>
           
           <div className="space-y-8">
             <div className="flex items-start gap-4">
               <div className="bg-indigo-100 p-2.5 rounded-full text-indigo-600 shrink-0">
                 <ArrowRightCircle size={20} />
               </div>
               <div>
                 <span className="text-slate-400 text-[11px] uppercase font-bold">Início Hoje</span>
                 <p className="text-slate-900 font-semibold text-md">Ponto de partida: {formatCurrency(data.currentSavings)}</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600 shrink-0">
                 <Target size={20} />
               </div>
               <div>
                 <span className="text-slate-400 text-[11px] uppercase font-bold">Em {data.timeframeMonths} meses</span>
                 <p className="text-slate-900 font-semibold text-md">Meta alcançada: {formatCurrency(data.targetAmount)}!</p>
               </div>
             </div>
           </div>
        </div>

        <AiInsights context={aiContext} />
      </div>
    </div>
  );
};

export default SavingsGoalCalc;
