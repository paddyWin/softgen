'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface Document {
  id: string;
  type: 'invoice' | 'quote';
  number: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'accepted' | 'rejected';
}

const initialDocuments: Document[] = [
  {
    id: '1',
    type: 'invoice',
    number: 'INV-2024-001',
    client: 'Bedrijf A',
    date: '2024-02-01',
    dueDate: '2024-03-01',
    amount: 1250.00,
    status: 'paid',
  },
  {
    id: '2',
    type: 'quote',
    number: 'QUO-2024-001',
    client: 'Bedrijf B',
    date: '2024-02-05',
    dueDate: '2024-02-19',
    amount: 3750.00,
    status: 'sent',
  },
  {
    id: '3',
    type: 'invoice',
    number: 'INV-2024-002',
    client: 'Bedrijf C',
    date: '2024-02-10',
    dueDate: '2024-03-10',
    amount: 850.00,
    status: 'overdue',
  },
];

export default function InvoicesQuotesPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    type: 'all',
    status: 'all',
    search: '',
  });

  const filteredDocuments = documents.filter((doc) => {
    if (filter.type !== 'all' && doc.type !== filter.type) return false;
    if (filter.status !== 'all' && doc.status !== filter.status) return false;
    if (filter.search && !doc.client.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'accepted':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Facturen & Offertes</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Nieuw Document
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={filter.type}
                  onChange={(e) =>
                    setFilter({ ...filter, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">Alle Types</option>
                  <option value="invoice">Facturen</option>
                  <option value="quote">Offertes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filter.status}
                  onChange={(e) =>
                    setFilter({ ...filter, status: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">Alle Statussen</option>
                  <option value="draft">Concept</option>
                  <option value="sent">Verzonden</option>
                  <option value="paid">Betaald</option>
                  <option value="overdue">Te Laat</option>
                  <option value="accepted">Geaccepteerd</option>
                  <option value="rejected">Afgewezen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zoeken
                </label>
                <input
                  type="text"
                  value={filter.search}
                  onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                  }
                  placeholder="Zoek op klantnaam..."
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nummer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Klant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vervaldatum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bedrag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className={`hover:bg-gray-50 ${
                      selectedDocument === doc.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedDocument(doc.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize">
                        {doc.type === 'invoice' ? 'Factuur' : 'Offerte'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      €{doc.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          doc.status
                        )}`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Bewerk
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Verwijder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 