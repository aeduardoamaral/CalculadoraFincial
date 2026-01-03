
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

  const aiContext = `Simulação de Meta Financeira:
    Objetivo Final: ${formatCurrency(data.targetAmount)}
    Já Economizado: ${formatCurrency(data.currentSavings)}
    Expectativa de Rendimento: ${data.annualRate}% aa
    Prazo Alvo: ${data.timeframeMonths} meses
    Aporte Mensal Sugerido: ${formatCurrency(results.requiredMonthly)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target size={22} className="text-indigo-600" /> Planejamento de Meta
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Quanto deseja acumular?</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.targetAmount}
                  onChange={(e) => setData({...data, targetAmount: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Saldo Inicial Disponível</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.currentSavings}
                  onChange={(e) => setData({...data, currentSavings: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Rentabilidade (% aa)</label>
                <input 
                  type="number"
                  step="0.1"
                  value={data.annualRate}
                  onChange={(e) => setData({...data, annualRate: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Meses</label>
                <input 
                  type="number"
                  value={data.timeframeMonths}
                  onChange={(e) => setData({...data, timeframeMonths: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
          <TrendingUp className="absolute -right-8 -bottom-8 text-white/10 group-hover:scale-110 transition-transform duration-700" size={160} />
          <div className="relative z-10">
            <span className="text-emerald-100 text-xs font-bold uppercase tracking-[0.2em] block mb-2">Aporte Mensal Requerido</span>
            <span className="text-4xl font-black block tracking-tighter">{formatCurrency(results.requiredMonthly)}</span>
            <p className="mt-4 text-emerald-50 text-sm leading-relaxed max-w-[240px]">
              Valor mensal para alcançar seu objetivo de <strong>{formatCurrency(data.targetAmount)}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Visuals / Timeline */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-center min-h-[260px]">
           <h4 className="text-slate-800 text-base font-bold mb-10 flex items-center gap-2">
             <Calendar size={20} className="text-indigo-600" /> Cronograma de Realização
           </h4>
           
           <div className="space-y-10 relative">
             <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
             
             <div className="flex items-start gap-6 relative z-10">
               <div className="bg-indigo-100 p-2.5 rounded-full text-indigo-600 shadow-sm border border-white">
                 <ArrowRightCircle size={22} />
               </div>
               <div>
                 <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest block mb-1">Ponto de Partida (Mês 0)</span>
                 <p className="text-slate-900 font-bold text-lg">Início com {formatCurrency(data.currentSavings)}</p>
               </div>
             </div>

             <div className="flex items-start gap-6 relative z-10">
               <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600 shadow-sm border border-white">
                 <Target size={22} />
               </div>
               <div>
                 <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest block mb-1">Mês {data.timeframeMonths}</span>
                 <p className="text-slate-900 font-bold text-lg">Objetivo de {formatCurrency(data.targetAmount)} atingido!</p>
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
