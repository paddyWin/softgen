'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface PodcastSegment {
  id: string;
  type: 'intro' | 'content' | 'outro';
  title: string;
  duration: number;
  script: string;
  voiceType: string;
}

export default function AIPodcastStudioPage() {
  const [segments, setSegments] = useState<PodcastSegment[]>([
    {
      id: '1',
      type: 'intro',
      title: 'Podcast Intro',
      duration: 30,
      script: 'Welkom bij deze aflevering...',
      voiceType: 'male1',
    },
  ]);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const addSegment = () => {
    const newSegment: PodcastSegment = {
      id: Date.now().toString(),
      type: 'content',
      title: 'Nieuw Segment',
      duration: 120,
      script: '',
      voiceType: 'male1',
    };
    setSegments([...segments, newSegment]);
    setSelectedSegment(newSegment.id);
  };

  const updateSegment = (id: string, updates: Partial<PodcastSegment>) => {
    setSegments(
      segments.map((segment) =>
        segment.id === id ? { ...segment, ...updates } : segment
      )
    );
  };

  const deleteSegment = (id: string) => {
    setSegments(segments.filter((segment) => segment.id !== id));
    if (selectedSegment === id) {
      setSelectedSegment(null);
    }
  };

  const generateAudio = async () => {
    setIsGenerating(true);
    try {
      // Simuleer API call naar AI service
      await new Promise((resolve) => setTimeout(resolve, 3000));
      alert('Audio succesvol gegenereerd!');
    } catch (error) {
      alert('Er is een fout opgetreden bij het genereren van de audio.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Timeline Panel */}
        <div className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
          <div className="space-y-4">
            <button
              onClick={addSegment}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Nieuw Segment
            </button>

            {segments.map((segment) => (
              <div
                key={segment.id}
                onClick={() => setSelectedSegment(segment.id)}
                className={`p-3 rounded-md cursor-pointer ${
                  selectedSegment === segment.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-medium truncate">{segment.title}</div>
                <div className="text-sm text-gray-500">
                  {segment.duration}s • {segment.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Panel */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedSegment ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Segment Bewerken</h2>
                <button
                  onClick={() => deleteSegment(selectedSegment)}
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
                      segments.find((s) => s.id === selectedSegment)?.title || ''
                    }
                    onChange={(e) =>
                      updateSegment(selectedSegment, { title: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={
                      segments.find((s) => s.id === selectedSegment)?.type || ''
                    }
                    onChange={(e) =>
                      updateSegment(selectedSegment, {
                        type: e.target.value as 'intro' | 'content' | 'outro',
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="intro">Intro</option>
                    <option value="content">Content</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duur (seconden)
                  </label>
                  <input
                    type="number"
                    value={
                      segments.find((s) => s.id === selectedSegment)?.duration ||
                      0
                    }
                    onChange={(e) =>
                      updateSegment(selectedSegment, {
                        duration: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Script
                  </label>
                  <textarea
                    value={
                      segments.find((s) => s.id === selectedSegment)?.script || ''
                    }
                    onChange={(e) =>
                      updateSegment(selectedSegment, { script: e.target.value })
                    }
                    rows={6}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stem Type
                  </label>
                  <select
                    value={
                      segments.find((s) => s.id === selectedSegment)?.voiceType ||
                      ''
                    }
                    onChange={(e) =>
                      updateSegment(selectedSegment, { voiceType: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="male1">Man 1</option>
                    <option value="male2">Man 2</option>
                    <option value="female1">Vrouw 1</option>
                    <option value="female2">Vrouw 2</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-12">
              Selecteer een segment om te bewerken
            </div>
          )}
        </div>

        {/* Tools Panel */}
        <div className="w-64 bg-gray-100 p-4 border-l">
          <div className="space-y-4">
            <h3 className="font-medium mb-2">Tools</h3>

            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-full py-2 px-4 rounded-md text-white ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isRecording ? 'Stop Opname' : 'Start Opname'}
            </button>

            <button
              onClick={generateAudio}
              disabled={isGenerating}
              className={`w-full py-2 px-4 rounded-md text-white ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isGenerating ? 'Genereren...' : 'Genereer Audio'}
            </button>

            <div className="mt-8">
              <h4 className="font-medium mb-2">Totale Duur</h4>
              <p className="text-2xl font-bold">
                {segments.reduce((acc, seg) => acc + seg.duration, 0)}s
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 