
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
    
    // PMT formula: P * [i(1+i)^n] / [(1+i)^n - 1]
    const monthlyPayment = p * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    const pieData = [
      { name: 'Capital Principal', value: p, color: '#4f46e5' },
      { name: 'Total de Juros', value: totalInterest, color: '#f43f5e' }
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
    Valor do Empréstimo: ${formatCurrency(data.loanAmount)}
    Taxa de Juros: ${data.interestRate}% ao ano
    Prazo: ${data.termMonths} meses (${data.termMonths / 12} anos)
    Parcela Mensal: ${formatCurrency(results.monthlyPayment)}
    Total a ser pago: ${formatCurrency(results.totalPayment)}
    Custo do Juro: ${formatCurrency(results.totalInterest)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Home size={20} className="text-indigo-600" /> Detalhes do Crédito
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Valor do Financiamento</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">R$</span>
                <input 
                  type="number"
                  value={data.loanAmount}
                  onChange={(e) => setData({...data, loanAmount: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Taxa de Juros Anual (%)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                <input 
                  type="number"
                  step="0.01"
                  value={data.interestRate}
                  onChange={(e) => setData({...data, interestRate: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Prazo (Meses)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">#</span>
                <input 
                  type="number"
                  value={data.termMonths}
                  onChange={(e) => setData({...data, termMonths: Number(e.target.value)})}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl text-white shadow-lg">
          <span className="text-slate-400 text-sm block mb-1">Parcela Mensal Estimada</span>
          <span className="text-3xl font-bold">{formatCurrency(results.monthlyPayment)}</span>
          <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Pago</span>
              <span>{formatCurrency(results.totalPayment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Custo Juros</span>
              <span className="text-rose-400">{formatCurrency(results.totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visuals */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center">
          <h4 className="text-slate-800 font-bold mb-6 w-full text-left">Distribuição do Custo Total</h4>
          <div className="flex-1 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={results.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {results.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
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
