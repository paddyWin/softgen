'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface FeasibilityAnalysis {
  marketSize: string;
  competitorAnalysis: {
    name: string;
    strengths: string[];
    weaknesses: string[];
    marketShare: number;
  }[];
  pricingStrategy: {
    recommended: string;
    minPrice: number;
    maxPrice: number;
    optimalPrice: number;
  };
  breakEvenAnalysis: {
    monthsToBreakEven: number;
    requiredRevenue: number;
    monthlyExpenses: number;
  };
  subsidies: {
    name: string;
    description: string;
    amount: string;
    eligibility: string[];
  }[];
}

interface BusinessPlan {
  executiveSummary: string;
  marketAnalysis: {
    targetMarket: string;
    marketSize: string;
    trends: string[];
    opportunities: string[];
  };
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  financialProjections: {
    year1: {
      revenue: number;
      expenses: number;
      profit: number;
    };
    year2: {
      revenue: number;
      expenses: number;
      profit: number;
    };
    year3: {
      revenue: number;
      expenses: number;
      profit: number;
    };
  };
  marketingStrategy: {
    channels: string[];
    budget: number;
    tactics: string[];
    kpis: string[];
  };
  operationalPlan: {
    location: string;
    equipment: string[];
    staff: string[];
    processes: string[];
  };
}

export default function StartUpAIPage() {
  const [activeTab, setActiveTab] = useState<'feasibility' | 'plan'>('feasibility');
  const [loading, setLoading] = useState(false);
  const [feasibilityAnalysis, setFeasibilityAnalysis] = useState<FeasibilityAnalysis | null>(null);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [formData, setFormData] = useState({
    businessIdea: '',
    industry: '',
    targetMarket: '',
    location: '',
    initialInvestment: '',
    monthlyBudget: '',
    uniqueSellingPoint: '',
    competitiveAdvantage: '',
    revenueModel: '',
    timeframe: '12',
  });

  const handleFeasibilityAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuleer API call naar AI service
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock response
      setFeasibilityAnalysis({
        marketSize: '€2.5 miljard in de Benelux',
        competitorAnalysis: [
          {
            name: 'Competitor A',
            strengths: ['Sterke merkwaarde', 'Groot klantenbestand'],
            weaknesses: ['Verouderde technologie', 'Hoge prijzen'],
            marketShare: 25,
          },
          {
            name: 'Competitor B',
            strengths: ['Innovatief product', 'Goede klantenservice'],
            weaknesses: ['Beperkte distributie', 'Klein team'],
            marketShare: 15,
          },
        ],
        pricingStrategy: {
          recommended: 'Premium pricing met introductiekorting',
          minPrice: 499,
          maxPrice: 999,
          optimalPrice: 799,
        },
        breakEvenAnalysis: {
          monthsToBreakEven: 18,
          requiredRevenue: 50000,
          monthlyExpenses: 8500,
        },
        subsidies: [
          {
            name: 'Innovatiesubsidie MKB+',
            description: 'Subsidie voor innovatieve startups',
            amount: '€25.000 - €50.000',
            eligibility: ['Tech sector', 'Minimaal 2 FTE', 'Innovatief product'],
          },
          {
            name: 'Duurzame Ondernemersregeling',
            description: 'Steun voor duurzame initiatieven',
            amount: '€10.000 - €30.000',
            eligibility: ['Duurzaam concept', 'CO2-reductie', 'Circulair model'],
          },
        ],
      });
    } catch (error) {
      alert('Er is een fout opgetreden bij het genereren van de haalbaarheidsanalyse.');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuleer API call naar AI service
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock response
      setBusinessPlan({
        executiveSummary: 'Een innovatieve SaaS-oplossing voor het MKB...',
        marketAnalysis: {
          targetMarket: 'MKB bedrijven met 10-50 werknemers',
          marketSize: '€2.5 miljard in de Benelux',
          trends: [
            'Toenemende digitalisering',
            'Focus op duurzaamheid',
            'Remote work adoption',
          ],
          opportunities: [
            'Groeiende vraag naar automatisering',
            'Onbediende nichemarkten',
            'Internationale expansiemogelijkheden',
          ],
        },
        swotAnalysis: {
          strengths: ['Innovatieve technologie', 'Ervaren team', 'Lage operationele kosten'],
          weaknesses: ['Nieuw merk', 'Beperkt startkapitaal', 'Kleine klantenbase'],
          opportunities: ['Groeiende markt', 'Nieuwe technologieën', 'Partnerships'],
          threats: ['Grote concurrenten', 'Veranderende regelgeving', 'Economische onzekerheid'],
        },
        financialProjections: {
          year1: {
            revenue: 250000,
            expenses: 200000,
            profit: 50000,
          },
          year2: {
            revenue: 500000,
            expenses: 350000,
            profit: 150000,
          },
          year3: {
            revenue: 1000000,
            expenses: 600000,
            profit: 400000,
          },
        },
        marketingStrategy: {
          channels: ['Social Media', 'Content Marketing', 'SEO', 'Email Marketing'],
          budget: 5000,
          tactics: [
            'Thought leadership content',
            'Webinars en workshops',
            'Partnerschappen',
            'Referral programma',
          ],
          kpis: ['Customer Acquisition Cost', 'Lifetime Value', 'Churn Rate', 'NPS'],
        },
        operationalPlan: {
          location: 'Hybride - kantoor in Amsterdam + remote team',
          equipment: ['Laptops', 'Software licenties', 'Cloud servers'],
          staff: ['CEO', 'CTO', 'Marketing Manager', 'Developers'],
          processes: ['Agile development', 'Customer support', 'Sales pipeline'],
        },
      });
    } catch (error) {
      alert('Er is een fout opgetreden bij het genereren van het business plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('feasibility')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'feasibility'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Haalbaarheidsanalyse
          </button>
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'plan'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Business Plan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">
              {activeTab === 'feasibility'
                ? 'FeasibilityBot - Haalbaarheidsanalyse'
                : 'PlanBot - Business Plan Generator'}
            </h2>
            <form
              onSubmit={
                activeTab === 'feasibility' ? handleFeasibilityAnalysis : handleBusinessPlan
              }
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Idee
                </label>
                <textarea
                  value={formData.businessIdea}
                  onChange={(e) =>
                    setFormData({ ...formData, businessIdea: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industrie
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doelmarkt
                </label>
                <input
                  type="text"
                  value={formData.targetMarket}
                  onChange={(e) =>
                    setFormData({ ...formData, targetMarket: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Locatie
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initiële Investering (€)
                </label>
                <input
                  type="number"
                  value={formData.initialInvestment}
                  onChange={(e) =>
                    setFormData({ ...formData, initialInvestment: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maandelijks Budget (€)
                </label>
                <input
                  type="number"
                  value={formData.monthlyBudget}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyBudget: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unique Selling Point
                </label>
                <textarea
                  value={formData.uniqueSellingPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, uniqueSellingPoint: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading
                  ? 'Analyseren...'
                  : activeTab === 'feasibility'
                  ? 'Start Haalbaarheidsanalyse'
                  : 'Genereer Business Plan'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Resultaten</h2>
            {activeTab === 'feasibility' ? (
              feasibilityAnalysis ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Marktgrootte</h3>
                    <p className="text-gray-600">{feasibilityAnalysis.marketSize}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Concurrent Analyse</h3>
                    <div className="space-y-4">
                      {feasibilityAnalysis.competitorAnalysis.map((competitor, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium">{competitor.name}</h4>
                          <p className="text-sm text-gray-500">
                            Marktaandeel: {competitor.marketShare}%
                          </p>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Sterktes:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {competitor.strengths.map((strength, i) => (
                                <li key={i}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Zwaktes:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {competitor.weaknesses.map((weakness, i) => (
                                <li key={i}>{weakness}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Prijsstrategie</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">
                        {feasibilityAnalysis.pricingStrategy.recommended}
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Minimum</p>
                          <p className="text-gray-600">
                            €{feasibilityAnalysis.pricingStrategy.minPrice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Optimaal</p>
                          <p className="text-gray-600">
                            €{feasibilityAnalysis.pricingStrategy.optimalPrice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Maximum</p>
                          <p className="text-gray-600">
                            €{feasibilityAnalysis.pricingStrategy.maxPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Break-even Analyse</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Maanden tot break-even</p>
                          <p className="text-gray-600">
                            {feasibilityAnalysis.breakEvenAnalysis.monthsToBreakEven}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Benodigde omzet</p>
                          <p className="text-gray-600">
                            €{feasibilityAnalysis.breakEvenAnalysis.requiredRevenue}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Maandelijkse kosten</p>
                          <p className="text-gray-600">
                            €{feasibilityAnalysis.breakEvenAnalysis.monthlyExpenses}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Beschikbare Subsidies</h3>
                    <div className="space-y-4">
                      {feasibilityAnalysis.subsidies.map((subsidy, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium">{subsidy.name}</h4>
                          <p className="text-sm text-gray-600">{subsidy.description}</p>
                          <p className="text-sm font-medium mt-2">Bedrag: {subsidy.amount}</p>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Voorwaarden:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {subsidy.eligibility.map((criterion, i) => (
                                <li key={i}>{criterion}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Vul het formulier in om een haalbaarheidsanalyse te starten
                </div>
              )
            ) : businessPlan ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Samenvatting</h3>
                  <p className="text-gray-600">{businessPlan.executiveSummary}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Marktanalyse</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium">Doelmarkt:</p>
                    <p className="text-gray-600">{businessPlan.marketAnalysis.targetMarket}</p>
                    <p className="text-sm font-medium mt-2">Marktgrootte:</p>
                    <p className="text-gray-600">{businessPlan.marketAnalysis.marketSize}</p>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Trends:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {businessPlan.marketAnalysis.trends.map((trend, i) => (
                          <li key={i}>{trend}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">SWOT Analyse</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800">Sterktes</h4>
                      <ul className="list-disc list-inside text-sm text-green-600">
                        {businessPlan.swotAnalysis.strengths.map((strength, i) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-800">Zwaktes</h4>
                      <ul className="list-disc list-inside text-sm text-red-600">
                        {businessPlan.swotAnalysis.weaknesses.map((weakness, i) => (
                          <li key={i}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">Kansen</h4>
                      <ul className="list-disc list-inside text-sm text-blue-600">
                        {businessPlan.swotAnalysis.opportunities.map((opportunity, i) => (
                          <li key={i}>{opportunity}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-800">Bedreigingen</h4>
                      <ul className="list-disc list-inside text-sm text-yellow-600">
                        {businessPlan.swotAnalysis.threats.map((threat, i) => (
                          <li key={i}>{threat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Financiële Projecties</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">Jaar 1</h4>
                      <p className="text-sm text-gray-600">
                        Omzet: €{businessPlan.financialProjections.year1.revenue}
                      </p>
                      <p className="text-sm text-gray-600">
                        Kosten: €{businessPlan.financialProjections.year1.expenses}
                      </p>
                      <p className="text-sm font-medium">
                        Winst: €{businessPlan.financialProjections.year1.profit}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">Jaar 2</h4>
                      <p className="text-sm text-gray-600">
                        Omzet: €{businessPlan.financialProjections.year2.revenue}
                      </p>
                      <p className="text-sm text-gray-600">
                        Kosten: €{businessPlan.financialProjections.year2.expenses}
                      </p>
                      <p className="text-sm font-medium">
                        Winst: €{businessPlan.financialProjections.year2.profit}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">Jaar 3</h4>
                      <p className="text-sm text-gray-600">
                        Omzet: €{businessPlan.financialProjections.year3.revenue}
                      </p>
                      <p className="text-sm text-gray-600">
                        Kosten: €{businessPlan.financialProjections.year3.expenses}
                      </p>
                      <p className="text-sm font-medium">
                        Winst: €{businessPlan.financialProjections.year3.profit}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Marketing Strategie</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium">Budget: €{businessPlan.marketingStrategy.budget}</p>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Kanalen:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {businessPlan.marketingStrategy.channels.map((channel, i) => (
                          <li key={i}>{channel}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Tactieken:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {businessPlan.marketingStrategy.tactics.map((tactic, i) => (
                          <li key={i}>{tactic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Operationeel Plan</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium">Locatie:</p>
                    <p className="text-gray-600">{businessPlan.operationalPlan.location}</p>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Team:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {businessPlan.operationalPlan.staff.map((member, i) => (
                          <li key={i}>{member}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Processen:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {businessPlan.operationalPlan.processes.map((process, i) => (
                          <li key={i}>{process}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Vul het formulier in om een business plan te genereren
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 