'use client';

import React from 'react';
import MainLayout from '../layouts/MainLayout';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Revenue & Expenses Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Financieel Overzicht</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Inkomsten (MTD)</span>
              <span className="text-green-600">€24,500</span>
            </div>
            <div className="flex justify-between">
              <span>Uitgaven (MTD)</span>
              <span className="text-red-600">€18,300</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recente Activiteit</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium">Nieuwe factuur aangemaakt</p>
                <p className="text-sm text-gray-500">Vandaag, 14:30</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">Betaling ontvangen</p>
                <p className="text-sm text-gray-500">Gisteren, 16:45</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Graphs */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Prestatie Grafieken</h2>
          <div className="h-48 flex items-center justify-center bg-gray-100 rounded">
            <p className="text-gray-500">Grafiek Placeholder</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Snelle Acties</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-100 rounded-lg text-blue-700 hover:bg-blue-200">
              Nieuwe Factuur
            </button>
            <button className="p-4 bg-green-100 rounded-lg text-green-700 hover:bg-green-200">
              Uitgave Toevoegen
            </button>
            <button className="p-4 bg-purple-100 rounded-lg text-purple-700 hover:bg-purple-200">
              Rapport Genereren
            </button>
            <button className="p-4 bg-yellow-100 rounded-lg text-yellow-700 hover:bg-yellow-200">
              Planning Bekijken
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 