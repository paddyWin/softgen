import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface ApiKey {
  id: string;
  botName: string;
  key: string;
  permissions: 'read' | 'write' | 'full';
  createdAt: Date;
  expiresAt: Date;
}

const initialApiKeys: ApiKey[] = [
  {
    id: '1',
    botName: 'FinanceBot',
    key: '************',
    permissions: 'full',
    createdAt: new Date(),
    expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  },
  // Voeg meer API-sleutels toe indien nodig
];

export default function ApiManagementPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateKey = () => {
    // Logica voor het genereren van een nieuwe API-sleutel
  };

  const handleRevokeKey = (id: string) => {
    // Logica voor het intrekken van een API-sleutel
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">API Management Dashboard</h2>
        <button
          onClick={handleGenerateKey}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Genereer Nieuwe API-sleutel
        </button>
        <div className="grid grid-cols-1 gap-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="p-4 border rounded-md">
              <h3 className="font-medium">{key.botName}</h3>
              <p>Rechten: {key.permissions}</p>
              <p>Gemaakt op: {key.createdAt.toLocaleDateString()}</p>
              <p>Verloopt op: {key.expiresAt.toLocaleDateString()}</p>
              <button
                onClick={() => handleRevokeKey(key.id)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Intrekken
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 