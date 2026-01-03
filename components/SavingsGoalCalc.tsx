
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
    const r = data.annualRate / 100 / 12; // Monthly rate
    const n = data.timeframeMonths;
    const fv = data.targetAmount;
    const pv = data.currentSavings;

    // PMT formula: PMT = (FV - PV * (1 + r)^n) * r / ((1 + r)^n - 1)
    
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
    Valor Desejado: ${formatCurrency(data.targetAmount)}
    Saldo Atual: ${formatCurrency(data.currentSavings)}
    Rentabilidade Esperada: ${data.annualRate}% ao ano
    Tempo disponível: ${data.timeframeMonths} meses
    Investimento Mensal Necessário: ${formatCurrency(results.requiredMonthly)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target size={20} className="text-indigo-600" /> Qual sua meta?
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Quanto você quer ter?</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">R$</span>
                <input 
                  type="number"
                  value={data.targetAmount}
                  onChange={(e) => setData({...data, targetAmount: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Quanto você já tem poupado?</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">R$</span>
                <input 
                  type="number"
                  value={data.currentSavings}
                  onChange={(e) => setData({...data, currentSavings: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Rentabilidade (%)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  <input 
                    type="number"
                    step="0.1"
                    value={data.annualRate}
                    onChange={(e) => setData({...data, annualRate: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Tempo (Meses)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">#</span>
                  <input 
                    type="number"
                    value={data.timeframeMonths}
                    onChange={(e) => setData({...data, timeframeMonths: Number(e.target.value)})}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 p-8 rounded-2xl text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
          <TrendingUp className="absolute -right-8 -bottom-8 text-emerald-500 opacity-20" size={180} />
          <div className="relative z-10">
            <span className="text-emerald-100 text-sm font-medium uppercase tracking-widest block mb-2">Economia Mensal Necessária</span>
            <span className="text-4xl font-bold">{formatCurrency(results.requiredMonthly)}</span>
            <p className="mt-4 text-emerald-50 leading-relaxed text-sm">
              Para atingir sua meta de <span className="font-bold">{formatCurrency(data.targetAmount)}</span> em <span className="font-bold">{data.timeframeMonths} meses</span>, você precisa investir este valor mensalmente.
            </p>
          </div>
        </div>
      </div>

      {/* Visuals / Comparison */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-center">
           <h4 className="text-slate-800 font-bold mb-8 flex items-center gap-2">
             <Calendar className="text-indigo-600" /> Linha do Tempo da Conquista
           </h4>
           
           <div className="space-y-10">
             <div className="flex items-start gap-4">
               <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 shrink-0">
                 <ArrowRightCircle size={24} />
               </div>
               <div>
                 <span className="text-slate-500 text-xs uppercase font-bold">Hoje</span>
                 <p className="text-slate-900 font-semibold text-lg">Início com {formatCurrency(data.currentSavings)}</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                 <Target size={24} />
               </div>
               <div>
                 <span className="text-slate-500 text-xs uppercase font-bold">Daqui a {data.timeframeMonths} meses</span>
                 <p className="text-slate-900 font-semibold text-lg">Meta de {formatCurrency(data.targetAmount)} Atingida!</p>
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
