'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
  receipt: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

const initialExpenses: Expense[] = [
  {
    id: '1',
    date: '2024-02-15',
    description: 'Kantoorbenodigdheden',
    amount: 125.50,
    category: 'Kantoor',
    paymentMethod: 'Creditcard',
    receipt: true,
    status: 'approved',
  },
  {
    id: '2',
    date: '2024-02-14',
    description: 'Zakelijke lunch',
    amount: 45.80,
    category: 'Representatie',
    paymentMethod: 'Contant',
    receipt: true,
    status: 'pending',
  },
  {
    id: '3',
    date: '2024-02-13',
    description: 'Software licentie',
    amount: 299.99,
    category: 'Software',
    paymentMethod: 'Bankrekening',
    receipt: false,
    status: 'approved',
  },
];

const categories = [
  'Kantoor',
  'Representatie',
  'Software',
  'Reiskosten',
  'Marketing',
  'Overig',
];

const paymentMethods = ['Creditcard', 'Bankrekening', 'Contant', 'PayPal'];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [filters, setFilters] = useState({
    category: 'all',
    paymentMethod: 'all',
    status: 'all',
    hasReceipt: 'all',
    dateFrom: '',
    dateTo: '',
  });
  const [sortBy, setSortBy] = useState<{
    field: keyof Expense;
    direction: 'asc' | 'desc';
  }>({ field: 'date', direction: 'desc' });

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.category !== 'all' && expense.category !== filters.category)
      return false;
    if (
      filters.paymentMethod !== 'all' &&
      expense.paymentMethod !== filters.paymentMethod
    )
      return false;
    if (filters.status !== 'all' && expense.status !== filters.status)
      return false;
    if (
      filters.hasReceipt !== 'all' &&
      expense.receipt !== (filters.hasReceipt === 'yes')
    )
      return false;
    if (filters.dateFrom && expense.date < filters.dateFrom) return false;
    if (filters.dateTo && expense.date > filters.dateTo) return false;
    return true;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const aValue = a[sortBy.field];
    const bValue = b[sortBy.field];
    if (sortBy.direction === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const handleSort = (field: keyof Expense) => {
    setSortBy({
      field,
      direction:
        sortBy.field === field && sortBy.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const getStatusColor = (status: Expense['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Filter Sidebar */}
        <div className="w-64 bg-white border-r p-4">
          <h3 className="font-medium mb-4">Filters</h3>
          <div className="space-y-4">
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
                Betaalmethode
              </label>
              <select
                value={filters.paymentMethod}
                onChange={(e) =>
                  setFilters({ ...filters, paymentMethod: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Alle Methoden</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
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
                <option value="approved">Goedgekeurd</option>
                <option value="rejected">Afgekeurd</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bon Aanwezig
              </label>
              <select
                value={filters.hasReceipt}
                onChange={(e) =>
                  setFilters({ ...filters, hasReceipt: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">Alles</option>
                <option value="yes">Ja</option>
                <option value="no">Nee</option>
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Uitgaven</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Nieuwe Uitgave
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Totaal deze maand
              </h3>
              <p className="text-2xl font-bold">
                €
                {sortedExpenses
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Openstaande uitgaven
              </h3>
              <p className="text-2xl font-bold">
                {
                  sortedExpenses.filter(
                    (expense) => expense.status === 'pending'
                  ).length
                }
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Ontbrekende bonnen
              </h3>
              <p className="text-2xl font-bold">
                {sortedExpenses.filter((expense) => !expense.receipt).length}
              </p>
            </div>
          </div>

          {/* Expenses Table */}
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
                    Betaalmethode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bon
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
                {sortedExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
                    <td className="px-6 py-4">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      €{expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.receipt ? '✓' : '✗'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          expense.status
                        )}`}
                      >
                        {expense.status}
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