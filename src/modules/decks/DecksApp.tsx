import React from 'react';
import { ToastType } from '@/types/documents';
import { Presentation, Rocket } from 'lucide-react';

interface DecksAppProps {
  showToast: (message: string, type: ToastType) => void;
}

const DecksApp: React.FC<DecksAppProps> = ({ showToast }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-full mb-4">
          <Presentation className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-4xl font-bold text-slate-800 mb-2">IterativDecks</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Generate investor-ready pitch decks with AI-powered insights and validation frameworks.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto text-center">
        <Rocket className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Coming Soon</h3>
        <p className="text-slate-600 mb-6">
          We're building powerful deck generation capabilities with AI-powered assumption extraction and validation workflows.
        </p>
        <button
          onClick={() => showToast('Deck generation feature coming soon!', 'info')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Notify Me When Ready
        </button>
      </div>
    </div>
  );
};

export default DecksApp;
