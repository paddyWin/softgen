'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'social' | 'email' | 'blog' | 'ad';
}

const templates: ContentTemplate[] = [
  {
    id: 'social1',
    name: 'Instagram Post',
    description: 'Visuele post met pakkende tekst',
    type: 'social',
  },
  {
    id: 'social2',
    name: 'LinkedIn Artikel',
    description: 'Professioneel artikel met zakelijke toon',
    type: 'social',
  },
  {
    id: 'email1',
    name: 'Nieuwsbrief',
    description: 'Maandelijkse update voor klanten',
    type: 'email',
  },
  {
    id: 'blog1',
    name: 'Blog Post',
    description: 'SEO-geoptimaliseerde blog content',
    type: 'blog',
  },
  {
    id: 'ad1',
    name: 'Facebook Advertentie',
    description: 'Conversie-gerichte advertentietekst',
    type: 'ad',
  },
];

export default function PromoAIPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(
    null
  );
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    targetAudience: '',
    keywords: '',
  });
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    setLoading(true);
    try {
      // Simuleer API call naar AI service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response
      setGeneratedContent(
        `Hier is je ${selectedTemplate.name} over ${formData.topic}!\n\n` +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat.'
      );
    } catch (error) {
      alert('Er is een fout opgetreden bij het genereren van de content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Linker paneel - Controls */}
        <div className="lg:w-1/2 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6">Content Generator</h2>

          {/* Template Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-lg text-left transition-colors ${
                  selectedTemplate?.id === template.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </button>
            ))}
          </div>

          {/* Content Form */}
          {selectedTemplate && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Onderwerp
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Toon
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) =>
                    setFormData({ ...formData, tone: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="professional">Professioneel</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Vriendelijk</option>
                  <option value="formal">Formeel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doelgroep
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAudience: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords (gescheiden door komma's)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) =>
                    setFormData({ ...formData, keywords: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
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
                {loading ? 'Genereren...' : 'Genereer Content'}
              </button>
            </form>
          )}
        </div>

        {/* Rechter paneel - Preview */}
        <div className="lg:w-1/2 bg-gray-50 p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l">
          <div className="bg-white rounded-lg p-6 min-h-[300px] shadow-md">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            {generatedContent ? (
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{generatedContent}</p>
              </div>
            ) : (
              <div className="text-gray-500 text-center mt-12">
                Selecteer een template en vul het formulier in om content te
                genereren
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 