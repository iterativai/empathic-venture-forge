import React, { useState, useCallback } from 'react';
import { FileText, Presentation, FileSignature, FormInput } from 'lucide-react';
import { HubModule, ToastMessage, ToastType } from '@/types/documents';
import PlansApp from '@/modules/plans/PlansApp';
import DecksApp from '@/modules/decks/DecksApp';
import ProposalsApp from '@/modules/proposals/ProposalsApp';
import FormsApp from '@/modules/forms/FormsApp';
import { Toaster as DocumentsToaster } from '@/components/documents/Toaster';

const hubModules = [
  { id: 'plans' as HubModule, label: 'IterativePlans', icon: FileText },
  { id: 'decks' as HubModule, label: 'IterativDecks', icon: Presentation },
  { id: 'proposals' as HubModule, label: 'IterativProposals', icon: FileSignature },
  { id: 'forms' as HubModule, label: 'IterativForms', icon: FormInput },
];

const DocumentsHub: React.FC = () => {
  const [activeHub, setActiveHub] = useState<HubModule>('plans');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prev => [...prev, { message, type, id }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const renderActiveHub = () => {
    switch (activeHub) {
      case 'plans':
        return <PlansApp addToast={addToast} />;
      case 'decks':
        return <DecksApp showToast={addToast} />;
      case 'proposals':
        return <ProposalsApp addToast={addToast} />;
      case 'forms':
        return <FormsApp addToast={addToast} />;
      default:
        return <PlansApp addToast={addToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white/80 border-b border-slate-200 shadow-sm sticky top-0 z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Documents Hub
              </h1>
              <p className="text-sm text-slate-500">The Strategic Workspace of IterativStartups</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full">
            {hubModules.map(mod => {
              const isActive = activeHub === mod.id;
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveHub(mod.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive ? 'bg-white text-purple-700 shadow-md' : 'bg-transparent text-slate-600 hover:bg-white/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {mod.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderActiveHub()}
      </main>

      <DocumentsToaster toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default DocumentsHub;
