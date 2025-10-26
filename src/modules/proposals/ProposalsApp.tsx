import React from 'react';
import { ToastType } from '@/types/documents';
import { FileSignature, Briefcase } from 'lucide-react';

interface ProposalsAppProps {
  addToast: (message: string, type: ToastType) => void;
}

const ProposalsApp: React.FC<ProposalsAppProps> = ({ addToast }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-full mb-4">
          <FileSignature className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-4xl font-bold text-slate-800 mb-2">IterativProposals</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Craft winning proposals with evidence-based validation and client-centered design thinking.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto text-center">
        <Briefcase className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Coming Soon</h3>
        <p className="text-slate-600 mb-6">
          We're developing advanced proposal generation tools with hypothesis-driven validation and pivot intelligence.
        </p>
        <button
          onClick={() => addToast('Proposal builder feature coming soon!', 'info')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Notify Me When Ready
        </button>
      </div>
    </div>
  );
};

export default ProposalsApp;
