
import React, { useState, useMemo } from 'react';
import { 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Home } from 'lucide-react';
import { LoanData } from '../types.ts';
import AiInsights from './AiInsights.tsx';

const LoanCalc: React.FC = () => {
  const [data, setData] = useState<LoanData>({
    loanAmount: 250000,
    interestRate: 9.5,
    termMonths: 360
  });

  const results = useMemo(() => {
    const monthlyRate = data.interestRate / 100 / 12;
    const n = data.termMonths;
    const p = data.loanAmount;
    
    const monthlyPayment = p * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    const pieData = [
      { name: 'Principal', value: p, color: '#4f46e5' },
      { name: 'Juros', value: totalInterest, color: '#f43f5e' }
    ];

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      pieData
    };
  }, [data]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const aiContext = `Simulação de Financiamento:
    Valor: ${formatCurrency(data.loanAmount)}
    Taxa: ${data.interestRate}% aa
    Prazo: ${data.termMonths} meses
    Parcela: ${formatCurrency(results.monthlyPayment)}
    Total: ${formatCurrency(results.totalPayment)}
    Juros: ${formatCurrency(results.totalInterest)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-md font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Home size={20} className="text-indigo-600" /> Detalhes do Crédito
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Valor do Financiamento</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.loanAmount}
                  onChange={(e) => setData({...data, loanAmount: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Taxa (%)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={data.interestRate}
                  onChange={(e) => setData({...data, interestRate: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Prazo (Meses)</label>
                <input 
                  type="number"
                  value={data.termMonths}
                  onChange={(e) => setData({...data, termMonths: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl text-white shadow-lg">
          <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1.5">Parcela Mensal Estimada</span>
          <span className="text-2xl font-bold">{formatCurrency(results.monthlyPayment)}</span>
          <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total a Pagar</span>
              <span>{formatCurrency(results.totalPayment)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total em Juros</span>
              <span className="text-rose-400">{formatCurrency(results.totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visuals */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-h-[320px] flex flex-col">
          <h4 className="text-slate-800 text-sm font-bold mb-4">Distribuição do Custo Total</h4>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={results.pieData}
                  cx="50%"
                  cy="40%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {results.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" iconSize={10} wrapperStyle={{fontSize: '12px', paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <AiInsights context={aiContext} />
      </div>
    </div>
  );
};

export default LoanCalc;
