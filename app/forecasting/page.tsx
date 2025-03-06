'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface ForecastData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  growthRate: number;
  expenseRate: number;
  data: ForecastData[];
}

const generateMonthlyData = (
  months: number,
  baseRevenue: number,
  baseExpenses: number,
  growthRate: number,
  expenseRate: number
): ForecastData[] => {
  const data: ForecastData[] = [];
  const currentDate = new Date();

  for (let i = 0; i < months; i++) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + i);
    const month = date.toLocaleString('nl-NL', { month: 'long', year: 'numeric' });

    const revenue = baseRevenue * Math.pow(1 + growthRate / 100, i);
    const expenses = baseExpenses * Math.pow(1 + expenseRate / 100, i);

    data.push({
      month,
      revenue,
      expenses,
      profit: revenue - expenses,
    });
  }

  return data;
};

const initialScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Basis Scenario',
    description: 'Verwachte groei gebaseerd op huidige trends',
    growthRate: 5,
    expenseRate: 3,
    data: generateMonthlyData(12, 10000, 7000, 5, 3),
  },
  {
    id: '2',
    name: 'Optimistisch',
    description: 'Hoge groei met gecontroleerde kosten',
    growthRate: 10,
    expenseRate: 5,
    data: generateMonthlyData(12, 10000, 7000, 10, 5),
  },
  {
    id: '3',
    name: 'Conservatief',
    description: 'Langzame maar stabiele groei',
    growthRate: 3,
    expenseRate: 2,
    data: generateMonthlyData(12, 10000, 7000, 3, 2),
  },
];

export default function ForecastingPage() {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [timeframe, setTimeframe] = useState<number>(12);

  const currentScenario = scenarios.find((s) => s.id === selectedScenario);

  const updateScenario = (
    id: string,
    updates: { growthRate?: number; expenseRate?: number }
  ) => {
    setScenarios(
      scenarios.map((scenario) => {
        if (scenario.id === id) {
          const updatedScenario = {
            ...scenario,
            ...updates,
            data: generateMonthlyData(
              timeframe,
              10000,
              7000,
              updates.growthRate ?? scenario.growthRate,
              updates.expenseRate ?? scenario.expenseRate
            ),
          };
          return updatedScenario;
        }
        return scenario;
      })
    );
  };

  const addScenario = () => {
    const newScenario: Scenario = {
      id: Date.now().toString(),
      name: 'Nieuw Scenario',
      description: 'Beschrijf je scenario',
      growthRate: 5,
      expenseRate: 3,
      data: generateMonthlyData(timeframe, 10000, 7000, 5, 3),
    };
    setScenarios([...scenarios, newScenario]);
    setSelectedScenario(newScenario.id);
  };

  const deleteScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    setScenarios(scenarios.filter((s) => s.id !== id));
    if (selectedScenario === id) {
      setSelectedScenario(scenarios[0].id);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Financiële Voorspellingen</h2>
            <button
              onClick={addScenario}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Nieuw Scenario
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scenario Selection & Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Scenario Selection */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-medium mb-4">Scenario's</h3>
                <div className="space-y-2">
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario.id)}
                      className={`p-3 rounded-lg cursor-pointer ${
                        selectedScenario === scenario.id
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{scenario.name}</h4>
                        {scenarios.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteScenario(scenario.id);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {scenario.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenario Controls */}
              {currentScenario && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-medium mb-4">Parameters</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Groei Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={currentScenario.growthRate}
                        onChange={(e) =>
                          updateScenario(currentScenario.id, {
                            growthRate: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kosten Stijging (%)
                      </label>
                      <input
                        type="number"
                        value={currentScenario.expenseRate}
                        onChange={(e) =>
                          updateScenario(currentScenario.id, {
                            expenseRate: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tijdsbestek (maanden)
                      </label>
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(parseInt(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="6">6 maanden</option>
                        <option value="12">12 maanden</option>
                        <option value="24">24 maanden</option>
                        <option value="36">36 maanden</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Forecast Data */}
            <div className="lg:col-span-2">
              {currentScenario && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-medium mb-4">Voorspellingen</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Maand
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Omzet
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kosten
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Winst
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentScenario.data.map((data, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {data.month}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              €{data.revenue.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              €{data.expenses.toFixed(2)}
                            </td>
                            <td
                              className={`px-6 py-4 whitespace-nowrap font-medium ${
                                data.profit >= 0
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              €{data.profit.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 