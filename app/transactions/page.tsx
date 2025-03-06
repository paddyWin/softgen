'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  account: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
}

const initialTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-15',
    description: 'Klant Betaling #INV-2024-001',
    amount: 1250.00,
    type: 'income',
    category: 'Verkoop',
    account: 'Zakelijke Rekening',
    reference: 'INV-2024-001',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-02-14',
    description: 'Kantoorhuur Februari',
    amount: 800.00,
    type: 'expense',
    category: 'Huisvesting',
    account: 'Zakelijke Rekening',
    reference: 'HUUR-2024-02',
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-02-13',
    description: 'Software Abonnement',
    amount: 49.99,
    type: 'expense',
    category: 'Software',
    account: 'Creditcard',
    reference: 'SUB-2024-02',
    status: 'pending',
  },
];

const categories = [
  'Verkoop',
  'Huisvesting',
  'Software',
  'Marketing',
  'Salarissen',
  'Overig',
];

const accounts = ['Zakelijke Rekening', 'Spaarrekening', 'Creditcard', 'PayPal'];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions
  );
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    account: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    search: '',
  });
  const [sortBy, setSortBy] = useState<{
    field: keyof Transaction;
    direction: 'asc' | 'desc';
  }>({ field: 'date', direction: 'desc' });

  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.type !== 'all' && transaction.type !== filters.type) return false;
    if (filters.category !== 'all' && transaction.category !== filters.category)
      return false;
    if (filters.account !== 'all' && transaction.account !== filters.account)
      return false;
    if (filters.status !== 'all' && transaction.status !== filters.status)
      return false;
    if (filters.dateFrom && transaction.date < filters.dateFrom) return false;
    if (filters.dateTo && transaction.date > filters.dateTo) return false;
    if (
      filters.search &&
      !transaction.description
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !transaction.reference.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const aValue = a[sortBy.field];
    const bValue = b[sortBy.field];
    if (sortBy.direction === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const handleSort = (field: keyof Transaction) => {
    setSortBy({
      field,
      direction:
        sortBy.field === field && sortBy.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmountColor = (type: Transaction['type']) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const totalIncome = sortedTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = sortedTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Filter Sidebar */}
        <div className="w-64 bg-white border-r p-4">
          <h3 className="font-medium mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Alle Types</option>
                <option value="income">Inkomsten</option>
                <option value="expense">Uitgaven</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categorie
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Alle Categorieën</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rekening
              </label>
              <select
                value={filters.account}
                onChange={(e) =>
                  setFilters({ ...filters, account: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Alle Rekeningen</option>
                {accounts.map((account) => (
                  <option key={account} value={account}>
                    {account}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Alle Statussen</option>
                <option value="pending">In Behandeling</option>
                <option value="completed">Voltooid</option>
                <option value="failed">Mislukt</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Datum Vanaf
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Datum Tot
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zoeken
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                placeholder="Zoek op omschrijving..."
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Transacties</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Nieuwe Transactie
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Totaal Inkomsten
              </h3>
              <p className="text-2xl font-bold text-green-600">
                €{totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Totaal Uitgaven
              </h3>
              <p className="text-2xl font-bold text-red-600">
                €{totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Balans</h3>
              <p
                className={`text-2xl font-bold ${
                  totalIncome - totalExpenses >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                €{(totalIncome - totalExpenses).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Datum
                    {sortBy.field === 'date' && (
                      <span>{sortBy.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('description')}
                  >
                    Omschrijving
                    {sortBy.field === 'description' && (
                      <span>{sortBy.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('amount')}
                  >
                    Bedrag
                    {sortBy.field === 'amount' && (
                      <span>{sortBy.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rekening
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referentie
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
                {sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap font-medium ${getAmountColor(
                        transaction.type
                      )}`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}€
                      {transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.account}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Details
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