
import React, { useState, useMemo } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { PlusCircle } from 'lucide-react';
import { InvestmentData, ChartDataPoint } from '../types.ts';
import AiInsights from './AiInsights.tsx';

const CompoundInterestCalc: React.FC = () => {
  const [data, setData] = useState<InvestmentData>({
    initialAmount: 5000,
    monthlyContribution: 500,
    annualRate: 10,
    periodYears: 10
  });

  const results = useMemo(() => {
    const monthlyRate = data.annualRate / 100 / 12;
    const months = data.periodYears * 12;
    const chartData: ChartDataPoint[] = [];
    
    let total = data.initialAmount;
    let totalInvested = data.initialAmount;

    for (let i = 0; i <= months; i++) {
      if (i > 0) {
        const interest = total * monthlyRate;
        total = total + interest + data.monthlyContribution;
        totalInvested += data.monthlyContribution;
      }
      
      if (i % 12 === 0 || i === months) {
        chartData.push({
          period: Math.floor(i / 12),
          total: Math.round(total),
          invested: Math.round(totalInvested),
          interest: Math.round(total - totalInvested)
        });
      }
    }

    return {
      finalBalance: total,
      totalInvested: totalInvested,
      totalInterest: total - totalInvested,
      chartData
    };
  }, [data]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const aiContext = `Simulação de Juros Compostos:
    Valor Inicial: ${formatCurrency(data.initialAmount)}
    Aporte Mensal: ${formatCurrency(data.monthlyContribution)}
    Taxa Anual: ${data.annualRate}%
    Período: ${data.periodYears} anos
    Resultado Final: ${formatCurrency(results.finalBalance)}
    Total de Juros Ganhos: ${formatCurrency(results.totalInterest)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PlusCircle size={20} className="text-indigo-600" /> Parâmetros
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Investimento Inicial</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.initialAmount}
                  onChange={(e) => setData({...data, initialAmount: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Aporte Mensal</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.monthlyContribution}
                  onChange={(e) => setData({...data, monthlyContribution: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Taxa (%)</label>
                <input 
                  type="number"
                  step="0.1"
                  value={data.annualRate}
                  onChange={(e) => setData({...data, annualRate: Number(e.target.value)})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Anos</label>
                <input 
                  type="number"
                  value={data.periodYears}
                  onChange={(e) => setData({...data, periodYears: Number(e.target.value)})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
          <p className="text-xs text-indigo-700 leading-relaxed italic">
            *Simulação baseada em rentabilidade constante e reinvestimento mensal automático.
          </p>
        </div>
      </div>

      {/* Results & Visuals */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-slate-400 text-[11px] uppercase font-bold block mb-1">Total Final</span>
            <span className="text-lg font-bold text-slate-900 truncate block">{formatCurrency(results.finalBalance)}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-slate-400 text-[11px] uppercase font-bold block mb-1">Investido</span>
            <span className="text-lg font-bold text-slate-900 truncate block">{formatCurrency(results.totalInvested)}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-slate-400 text-[11px] uppercase font-bold block mb-1">Rendimentos</span>
            <span className="text-lg font-bold text-emerald-600 truncate block">+{formatCurrency(results.totalInterest)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 min-h-[340px]">
          <h4 className="text-slate-800 text-base font-bold mb-6">Projeção de Crescimento Patrimonial</h4>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={results.chartData}>
              <defs>
                <linearGradient id="colorTotal93" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} tickMargin={10} label={{ value: 'Anos', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tickFormatter={(val) => `R$${val/1000}k`} stroke="#94a3b8" fontSize={11} width={60} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal93)" name="Montante" />
              <Area type="monotone" dataKey="invested" stroke="#cbd5e1" strokeWidth={2} fillOpacity={0} name="Investido" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <AiInsights context={aiContext} />
      </div>
    </div>
  );
};

export default CompoundInterestCalc;
