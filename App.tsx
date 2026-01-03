
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
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Calculator size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">FinanSmart</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-slate-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 text-indigo-600">
            <BrainCircuit size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">IA Insights</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Nossa IA analisa seus cálculos para oferecer estratégias personalizadas de investimento e economia.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <header className="mb-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {tabs.find(t => t.id === activeTab)?.name}
          </h2>
          <p className="text-slate-500">
            Simule seus projetos financeiros com precisão e receba orientações estratégicas.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          {activeTab === CalculatorType.COMPOUND_INTEREST && <CompoundInterestCalc />}
          {activeTab === CalculatorType.LOAN_AMORTIZATION && <LoanCalc />}
          {activeTab === CalculatorType.SAVINGS_GOAL && <SavingsGoalCalc />}
        </div>
        
        <footer className="mt-20 border-t border-slate-200 pt-8 pb-10 text-center space-y-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} FinanSmart - Sua saúde financeira em primeiro lugar.
          </p>
          <div className="flex flex-col items-center gap-2 text-slate-500 text-sm">
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
