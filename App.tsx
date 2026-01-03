
import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Home, 
  Target, 
  BrainCircuit,
  Mail,
  User
} from 'lucide-react';
import { CalculatorType } from './types.ts';
import CompoundInterestCalc from './components/CompoundInterestCalc.tsx';
import LoanCalc from './components/LoanCalc.tsx';
import SavingsGoalCalc from './components/SavingsGoalCalc.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorType>(CalculatorType.COMPOUND_INTEREST);

  const tabs = [
    { id: CalculatorType.COMPOUND_INTEREST, name: 'Juros Compostos', icon: TrendingUp },
    { id: CalculatorType.LOAN_AMORTIZATION, name: 'Financiamento', icon: Home },
    { id: CalculatorType.SAVINGS_GOAL, name: 'Metas de Economia', icon: Target },
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col gap-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Calculator size={22} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">FinanSmart</h1>
        </div>

        <nav className="flex flex-col gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                activeTab === tab.id 
                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <tab.icon size={19} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-slate-100 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-600">
            <BrainCircuit size={17} />
            <span className="text-xs font-bold uppercase tracking-wider">IA Insights</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Análise estratégica inteligente para suas finanças.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-5 md:p-8">
        <header className="mb-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">
            {tabs.find(t => t.id === activeTab)?.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Simulações precisas e orientações estratégicas.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          {activeTab === CalculatorType.COMPOUND_INTEREST && <CompoundInterestCalc />}
          {activeTab === CalculatorType.LOAN_AMORTIZATION && <LoanCalc />}
          {activeTab === CalculatorType.SAVINGS_GOAL && <SavingsGoalCalc />}
        </div>
        
        <footer className="mt-12 border-t border-slate-200 pt-6 pb-8 text-center space-y-3">
          <p className="text-slate-400 text-[11px]">
            &copy; {new Date().getFullYear()} FinanSmart
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-slate-500 text-[12px]">
            <div className="flex items-center gap-2">
              <User size={14} className="text-indigo-600" />
              <span>Desenvolvido por <span className="font-semibold text-slate-800">Eduardo Amaral</span></span>
            </div>
            <a 
              href="mailto:aeduardoamaral@gmail.com" 
              className="flex items-center gap-2 hover:text-indigo-600 transition-colors group"
            >
              <Mail size={14} className="group-hover:scale-110 transition-transform" />
              <span className="border-b border-transparent group-hover:border-indigo-600">aeduardoamaral@gmail.com</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
