'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface TaxDeadline {
  id: string;
  title: string;
  dueDate: string;
  type: 'btw' | 'inkomstenbelasting' | 'vennootschapsbelasting' | 'other';
  status: 'upcoming' | 'completed' | 'overdue';
  description: string;
}

interface TaxDocument {
  id: string;
  title: string;
  type: string;
  date: string;
  fileSize: string;
  category: string;
}

const initialDeadlines: TaxDeadline[] = [
  {
    id: '1',
    title: 'BTW Aangifte Q1',
    dueDate: '2024-04-30',
    type: 'btw',
    status: 'upcoming',
    description: 'Eerste kwartaal BTW aangifte 2024',
  },
  {
    id: '2',
    title: 'Voorlopige Aanslag VPB',
    dueDate: '2024-03-15',
    type: 'vennootschapsbelasting',
    status: 'completed',
    description: 'Voorlopige aanslag vennootschapsbelasting 2024',
  },
  {
    id: '3',
    title: 'Inkomstenbelasting 2023',
    dueDate: '2024-05-01',
    type: 'inkomstenbelasting',
    status: 'upcoming',
    description: 'Aangifte inkomstenbelasting 2023',
  },
];

const initialDocuments: TaxDocument[] = [
  {
    id: '1',
    title: 'BTW Aangifte 2023 Q4.pdf',
    type: 'PDF',
    date: '2024-01-15',
    fileSize: '2.4 MB',
    category: 'BTW',
  },
  {
    id: '2',
    title: 'Jaarrekening 2023.xlsx',
    type: 'Excel',
    date: '2024-02-01',
    fileSize: '1.8 MB',
    category: 'Financieel',
  },
  {
    id: '3',
    title: 'IB Aangifte 2023.pdf',
    type: 'PDF',
    date: '2024-02-10',
    fileSize: '3.1 MB',
    category: 'Inkomstenbelasting',
  },
];

export default function TaxCompliancePage() {
  const [deadlines, setDeadlines] = useState<TaxDeadline[]>(initialDeadlines);
  const [documents, setDocuments] = useState<TaxDocument[]>(initialDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getStatusColor = (status: TaxDeadline['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(
    (doc) => selectedCategory === 'all' || doc.category === selectedCategory
  );

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Belasting Compliance</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Upload Document
            </button>
          </div>

          {/* Tax Calendar */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-medium mb-4">Belasting Kalender</h3>
            <div className="space-y-4">
              {deadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{deadline.title}</h4>
                    <p className="text-sm text-gray-600">
                      {deadline.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      Deadline: {deadline.dueDate}
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        deadline.status
                      )}`}
                    >
                      {deadline.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Management */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Documenten</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="all">Alle Categorieën</option>
                <option value="BTW">BTW</option>
                <option value="Inkomstenbelasting">Inkomstenbelasting</option>
                <option value="Financieel">Financieel</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium truncate" title={doc.title}>
                        {doc.title}
                      </h4>
                      <p className="text-sm text-gray-500">{doc.category}</p>
                    </div>
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                      {doc.type}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>{doc.date}</span>
                    <span>{doc.fileSize}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 