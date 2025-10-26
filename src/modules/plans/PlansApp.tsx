import React, { useState } from 'react';
import { Mode, Assumption, ToastType } from '@/types/documents';
import { Brain, Zap, AlertTriangle, X } from 'lucide-react';

interface PlansAppProps {
  addToast: (message: string, type: ToastType) => void;
}

const MOCK_ASSUMPTIONS: Assumption[] = [
  { id: 'a1', text: 'Small businesses will pay $99/month for this solution.', risk: 'high', status: 'untested', sourceSection: 'Financial Projections' },
  { id: 'a2', text: 'The problem occurs frequently enough to justify a dedicated solution.', risk: 'high', status: 'untested', sourceSection: 'Problem Statement' },
  { id: 'a3', text: 'Users cannot easily solve this problem with existing tools.', risk: 'high', status: 'untested', sourceSection: 'Competitive Analysis' },
];

const PlansApp: React.FC<PlansAppProps> = ({ addToast }) => {
  const [mode, setMode] = useState<Mode>('fast-track');
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [formData, setFormData] = useState({
    problem: '',
    solution: '',
    market: '',
    advantage: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAssumptions(MOCK_ASSUMPTIONS);
      setMode('validated');
      setIsLoading(false);
      addToast('Business plan assumptions generated successfully!', 'success');
    }, 2000);
  };

  const handleClearAssumptions = () => {
    setAssumptions([]);
    setMode('fast-track');
    addToast('Assumption dashboard cleared.', 'info');
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-full flex items-center gap-1">
          <button
            onClick={() => setMode('fast-track')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              mode === 'fast-track' ? 'bg-white text-purple-700 shadow-md' : 'bg-transparent text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            Fast Track Mode
          </button>
          <button
            onClick={() => setMode('validated')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              mode === 'validated' ? 'bg-white text-purple-700 shadow-md' : 'bg-transparent text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            Validated Mode
          </button>
        </div>
      </div>

      {mode === 'fast-track' ? (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-full mb-4">
              <Zap className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-2">Fast Track Mode</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Generate a complete, professional business plan in minutes. Answer a few questions about your vision, and let our AI build the first draft.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Tell us about your business</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="problem" className="block text-sm font-medium text-slate-700 mb-1">
                    What problem are you solving?
                  </label>
                  <textarea
                    id="problem"
                    value={formData.problem}
                    onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Small businesses struggle with managing their cash flow accurately."
                  />
                </div>
                <div>
                  <label htmlFor="solution" className="block text-sm font-medium text-slate-700 mb-1">
                    What is your proposed solution?
                  </label>
                  <textarea
                    id="solution"
                    value={formData.solution}
                    onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., An AI-powered dashboard that provides real-time cash flow projections."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="market" className="block text-sm font-medium text-slate-700 mb-1">
                  Who is your target market?
                </label>
                <input
                  type="text"
                  id="market"
                  value={formData.market}
                  onChange={(e) => setFormData(prev => ({ ...prev, market: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., US-based small businesses with 5-50 employees"
                />
              </div>
              <div>
                <label htmlFor="advantage" className="block text-sm font-medium text-slate-700 mb-1">
                  What is your unique competitive advantage?
                </label>
                <input
                  type="text"
                  id="advantage"
                  value={formData.advantage}
                  onChange={(e) => setFormData(prev => ({ ...prev, advantage: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Our predictive AI is 15% more accurate than competitors."
                />
              </div>

              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={handleGeneratePlan}
                  disabled={isLoading || !formData.problem || !formData.solution}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Your Plan...
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6" />
                      Generate Plan & Extract Assumptions
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {assumptions.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 mb-8 border-2 border-purple-200 relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Assumption Dashboard</h3>
                  <p className="text-slate-600 mt-1">
                    Your Fast Track plan generated <span className="font-bold text-purple-600">{assumptions.length} assumptions</span>. It's time to validate the riskiest ones.
                  </p>
                </div>
                <button
                  onClick={handleClearAssumptions}
                  className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full p-2 transition-colors"
                  aria-label="Clear assumptions and start fresh"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {assumptions.filter(a => a.risk === 'high').map(assumption => (
                  <div
                    key={assumption.id}
                    className="p-4 rounded-lg border-l-4 flex items-start gap-4 border-red-500 bg-red-50 text-red-800"
                  >
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{assumption.text}</p>
                      <p className="text-xs opacity-80 mt-1">Source: {assumption.sourceSection} • Risk: High</p>
                    </div>
                    <button className="bg-purple-600 text-white text-xs font-semibold py-1 px-3 rounded-full hover:bg-purple-700 transition-colors">
                      Design Experiment
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center">
                Proceed with the <span className="font-semibold">Problem Discovery</span> phase to start validating these assumptions.
              </p>
            </div>
          )}

          {assumptions.length === 0 && (
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-12 text-white text-center">
              <h2 className="text-5xl font-bold mb-4">Planning Meets Reality</h2>
              <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                Stop writing fiction. Start with real problems, validate with real users, pivot with real data.
                The only platform built on Lean Design Thinking methodology.
              </p>
              <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-3 text-lg shadow-lg">
                <Brain className="w-6 h-6" /> Start Problem Discovery
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlansApp;
