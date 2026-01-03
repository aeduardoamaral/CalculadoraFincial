
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
    Valor Financiado: ${formatCurrency(data.loanAmount)}
    Taxa Anual: ${data.interestRate}%
    Prazo: ${data.termMonths} meses
    Parcela Mensal: ${formatCurrency(results.monthlyPayment)}
    Total a Pagar: ${formatCurrency(results.totalPayment)}
    Total em Juros: ${formatCurrency(results.totalInterest)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Home size={22} className="text-indigo-600" /> Dados do Crédito
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Valor do Crédito</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input 
                  type="number"
                  value={data.loanAmount}
                  onChange={(e) => setData({...data, loanAmount: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Taxa (% aa)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={data.interestRate}
                  onChange={(e) => setData({...data, interestRate: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Meses</label>
                <input 
                  type="number"
                  value={data.termMonths}
                  onChange={(e) => setData({...data, termMonths: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
          <span className="text-slate-400 text-[11px] uppercase font-bold tracking-widest block mb-1.5">Parcela Fixa Mensal</span>
          <span className="text-3xl font-bold block">{formatCurrency(results.monthlyPayment)}</span>
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Pagamento Total</span>
              <span className="font-medium">{formatCurrency(results.totalPayment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total de Juros</span>
              <span className="text-rose-400 font-semibold">{formatCurrency(results.totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visuals */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[340px] flex flex-col">
          <h4 className="text-slate-800 text-base font-bold mb-6">Proporção: Amortização vs Juros</h4>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={results.pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {results.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '13px' }}
                />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={10} wrapperStyle={{fontSize: '13px', paddingTop: '20px'}} />
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
