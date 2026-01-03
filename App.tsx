
import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Home, 
  Target, 
  BrainCircuit,
  Mail,
  User,
  Users
} from 'lucide-react';
import { CalculatorType } from './types.ts';
import CompoundInterestCalc from './components/CompoundInterestCalc.tsx';
import LoanCalc from './components/LoanCalc.tsx';
import SavingsGoalCalc from './components/SavingsGoalCalc.tsx';
import AdUnit from './components/AdUnit.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorType>(CalculatorType.COMPOUND_INTEREST);
  const [onlineUsers, setOnlineUsers] = useState(Math.floor(Math.random() * (800 - 300 + 1)) + 300);

  // Efeito para simular usuários online flutuando
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // Flutua entre -3 e +3
        const newValue = prev + change;
        // Mantém dentro do range 300-800
        return Math.min(800, Math.max(300, newValue));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: CalculatorType.COMPOUND_INTEREST, name: 'Juros Compostos', icon: TrendingUp },
    { id: CalculatorType.LOAN_AMORTIZATION, name: 'Financiamento', icon: Home },
    { id: CalculatorType.SAVINGS_GOAL, name: 'Metas de Economia', icon: Target },
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sidebar Esquerda - Navegação e Publicidade (260px) */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col gap-4 overflow-y-auto shrink-0">
        <div className="flex items-center gap-3 mb-2 shrink-0">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm">
            <Calculator size={22} />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">FinanSmart</h1>
        </div>

        <nav className="flex flex-col gap-1 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === tab.id 
                ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={18} />
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </nav>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shrink-0">
          <div className="flex items-center gap-2 mb-2 text-indigo-600">
            <BrainCircuit size={16} />
            <span className="text-xs font-bold uppercase tracking-widest text-[9px]">IA Insights</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Nossa IA analisa seus cálculos para oferecer estratégias personalizadas.
          </p>
        </div>

        {/* Espaço de Publicidade na Sidebar Esquerda - Agora Flexível para preencher o espaço restante */}
        <div className="flex-1 flex flex-col min-h-0 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3 px-1 shrink-0">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Destaques</span>
          </div>
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <AdUnit variant="sidebar" slotId="LEFT_SIDEBAR_TOP" />
            <AdUnit variant="sidebar" slotId="LEFT_SIDEBAR_BOTTOM" />
          </div>
        </div>
      </aside>

      {/* Main Content - Área Ampla */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {tabs.find(t => t.id === activeTab)?.name}
                </h2>
                <p className="text-slate-500 mt-2 text-sm lg:text-base max-w-2xl">
                  Simulações financeiras avançadas com precisão e clareza.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status do Sistema</span>
                <div className="flex items-center gap-4 mt-1">
                  {/* Usuários Online - Luz Âmbar */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100 transition-all">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1.5">
                      <Users size={12} />
                      {onlineUsers} online
                    </span>
                  </div>
                  
                  {/* Status Operacional - Luz Verde */}
                  <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Operacional
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="min-h-[600px]">
            {activeTab === CalculatorType.COMPOUND_INTEREST && <CompoundInterestCalc />}
            {activeTab === CalculatorType.LOAN_AMORTIZATION && <LoanCalc />}
            {activeTab === CalculatorType.SAVINGS_GOAL && <SavingsGoalCalc />}
          </section>
          
          <footer className="mt-20 border-t border-slate-200 pt-10 pb-12 text-center space-y-5">
            <div className="flex flex-col items-center gap-4">
              <p className="text-slate-400 text-xs tracking-wide">
                &copy; {new Date().getFullYear()} FinanSmart - Gestão Financeira Inteligente.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-slate-500 text-[13px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-[10px]">EA</div>
                  <span className="font-medium text-slate-700">Eduardo Amaral</span>
                </div>
                <a 
                  href="mailto:aeduardoamaral@gmail.com" 
                  className="flex items-center gap-2.5 hover:text-indigo-600 transition-all group"
                >
                  <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-50 transition-colors">
                    <Mail size={14} className="text-slate-400 group-hover:text-indigo-600" />
                  </div>
                  <span className="border-b border-transparent group-hover:border-indigo-600 font-medium">aeduardoamaral@gmail.com</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
