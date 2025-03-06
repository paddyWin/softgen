'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface FunnelStep {
  id: string;
  title: string;
  description: string;
  conversionRate: number;
  visitors: number;
  type:
    | 'awareness'
    | 'interest'
    | 'consideration'
    | 'intent'
    | 'evaluation'
    | 'purchase';
}

const initialFunnelSteps: FunnelStep[] = [
  {
    id: '1',
    title: 'Social Media Campagne',
    description: 'Bereik nieuwe potentiële klanten via sociale media',
    conversionRate: 5,
    visitors: 10000,
    type: 'awareness',
  },
  {
    id: '2',
    title: 'Landing Page',
    description: 'Converteer bezoekers naar leads',
    conversionRate: 20,
    visitors: 500,
    type: 'interest',
  },
  {
    id: '3',
    title: 'Email Nurturing',
    description: 'Bouw relaties op via email marketing',
    conversionRate: 10,
    visitors: 100,
    type: 'consideration',
  },
  {
    id: '4',
    title: 'Product Demo',
    description: 'Demonstreer de waarde van het product',
    conversionRate: 30,
    visitors: 10,
    type: 'purchase',
  },
];

export default function MarketingFunnelsPage() {
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>(initialFunnelSteps);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const addStep = () => {
    const newStep: FunnelStep = {
      id: Date.now().toString(),
      title: 'Nieuwe Stap',
      description: '',
      conversionRate: 0,
      visitors: 0,
      type: 'awareness',
    };
    setFunnelSteps([...funnelSteps, newStep]);
    setSelectedStep(newStep.id);
  };

  const updateStep = (id: string, updates: Partial<FunnelStep>) => {
    setFunnelSteps(
      funnelSteps.map((step) => (step.id === id ? { ...step, ...updates } : step))
    );
  };

  const deleteStep = (id: string) => {
    setFunnelSteps(funnelSteps.filter((step) => step.id !== id));
    if (selectedStep === id) {
      setSelectedStep(null);
    }
  };

  const calculateStepWidth = (index: number) => {
    const maxWidth = 100;
    const minWidth = 20;
    const step = (maxWidth - minWidth) / (funnelSteps.length - 1);
    return maxWidth - index * step;
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Funnel Designer */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Funnel Designer</h2>

            {/* Visual Funnel */}
            <div className="space-y-4 mb-8">
              {funnelSteps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className={`mx-auto p-4 rounded-lg cursor-pointer transition-all ${
                    selectedStep === step.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:border-blue-300'
                  }`}
                  style={{ width: `${calculateStepWidth(index)}%` }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {step.visitors} bezoekers
                      </div>
                      <div className="text-sm text-gray-500">
                        {step.conversionRate}% conversie
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addStep}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Voeg Stap Toe
            </button>
          </div>
        </div>

        {/* Step Editor */}
        <div className="w-80 bg-gray-100 p-6 border-l overflow-y-auto">
          {selectedStep ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Stap Bewerken</h3>
                <button
                  onClick={() => deleteStep(selectedStep)}
                  className="text-red-600 hover:text-red-800"
                >
                  Verwijderen
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titel
                  </label>
                  <input
                    type="text"
                    value={
                      funnelSteps.find((s) => s.id === selectedStep)?.title || ''
                    }
                    onChange={(e) =>
                      updateStep(selectedStep, { title: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beschrijving
                  </label>
                  <textarea
                    value={
                      funnelSteps.find((s) => s.id === selectedStep)
                        ?.description || ''
                    }
                    onChange={(e) =>
                      updateStep(selectedStep, { description: e.target.value })
                    }
                    rows={3}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={
                      funnelSteps.find((s) => s.id === selectedStep)?.type || ''
                    }
                    onChange={(e) =>
                      updateStep(selectedStep, {
                        type: e.target.value as FunnelStep['type'],
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="awareness">Bewustwording</option>
                    <option value="interest">Interesse</option>
                    <option value="consideration">Overweging</option>
                    <option value="intent">Intentie</option>
                    <option value="evaluation">Evaluatie</option>
                    <option value="purchase">Aankoop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aantal Bezoekers
                  </label>
                  <input
                    type="number"
                    value={
                      funnelSteps.find((s) => s.id === selectedStep)?.visitors ||
                      0
                    }
                    onChange={(e) =>
                      updateStep(selectedStep, {
                        visitors: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conversie Percentage
                  </label>
                  <input
                    type="number"
                    value={
                      funnelSteps.find((s) => s.id === selectedStep)
                        ?.conversionRate || 0
                    }
                    onChange={(e) =>
                      updateStep(selectedStep, {
                        conversionRate: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Selecteer een stap om te bewerken
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 