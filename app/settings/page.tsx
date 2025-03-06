'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface Settings {
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
    vatNumber: string;
    chamberOfCommerce: string;
  };
  billing: {
    currency: string;
    vatRate: number;
    paymentTerms: number;
    bankAccount: string;
    bankName: string;
  };
  notifications: {
    emailNotifications: boolean;
    invoiceReminders: boolean;
    taskReminders: boolean;
    marketingUpdates: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    ipWhitelist: string[];
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    dateFormat: string;
  };
}

const initialSettings: Settings = {
  company: {
    name: 'Mijn Bedrijf B.V.',
    email: 'info@mijnbedrijf.nl',
    phone: '+31 20 1234567',
    address: 'Hoofdstraat 1, 1234 AB Amsterdam',
    vatNumber: 'NL123456789B01',
    chamberOfCommerce: '12345678',
  },
  billing: {
    currency: 'EUR',
    vatRate: 21,
    paymentTerms: 30,
    bankAccount: 'NL12 INGB 0123 4567 89',
    bankName: 'ING Bank',
  },
  notifications: {
    emailNotifications: true,
    invoiceReminders: true,
    taskReminders: false,
    marketingUpdates: false,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: ['192.168.1.1'],
  },
  appearance: {
    theme: 'system',
    language: 'nl',
    timezone: 'Europe/Amsterdam',
    dateFormat: 'DD-MM-YYYY',
  },
};

const tabs = [
  { id: 'company', label: 'Bedrijf' },
  { id: 'billing', label: 'Facturatie' },
  { id: 'notifications', label: 'Notificaties' },
  { id: 'security', label: 'Beveiliging' },
  { id: 'appearance', label: 'Weergave' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [activeTab, setActiveTab] = useState('company');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState<Settings>(settings);

  const handleSave = () => {
    setSettings(editedSettings);
    setIsEditing(false);
  };

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bedrijfsnaam
        </label>
        <input
          type="text"
          value={editedSettings.company.name}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              company: { ...editedSettings.company, name: e.target.value },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={editedSettings.company.email}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              company: { ...editedSettings.company, email: e.target.value },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefoon
        </label>
        <input
          type="text"
          value={editedSettings.company.phone}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              company: { ...editedSettings.company, phone: e.target.value },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adres
        </label>
        <textarea
          value={editedSettings.company.address}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              company: { ...editedSettings.company, address: e.target.value },
            })
          }
          disabled={!isEditing}
          rows={3}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          BTW Nummer
        </label>
        <input
          type="text"
          value={editedSettings.company.vatNumber}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              company: { ...editedSettings.company, vatNumber: e.target.value },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          KvK Nummer
        </label>
        <input
          type="text"
          value={editedSettings.company.chamberOfCommerce}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              company: {
                ...editedSettings.company,
                chamberOfCommerce: e.target.value,
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Valuta
        </label>
        <select
          value={editedSettings.billing.currency}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              billing: { ...editedSettings.billing, currency: e.target.value },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          BTW Percentage
        </label>
        <input
          type="number"
          value={editedSettings.billing.vatRate}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              billing: {
                ...editedSettings.billing,
                vatRate: parseInt(e.target.value),
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Betalingstermijn (dagen)
        </label>
        <input
          type="number"
          value={editedSettings.billing.paymentTerms}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              billing: {
                ...editedSettings.billing,
                paymentTerms: parseInt(e.target.value),
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bankrekeningnummer
        </label>
        <input
          type="text"
          value={editedSettings.billing.bankAccount}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              billing: {
                ...editedSettings.billing,
                bankAccount: e.target.value,
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bank
        </label>
        <input
          type="text"
          value={editedSettings.billing.bankName}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              billing: { ...editedSettings.billing, bankName: e.target.value },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={editedSettings.notifications.emailNotifications}
            onChange={(e) =>
              setEditedSettings({
                ...editedSettings,
                notifications: {
                  ...editedSettings.notifications,
                  emailNotifications: e.target.checked,
                },
              })
            }
            disabled={!isEditing}
            className="mr-2"
          />
          Email Notificaties
        </label>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={editedSettings.notifications.invoiceReminders}
            onChange={(e) =>
              setEditedSettings({
                ...editedSettings,
                notifications: {
                  ...editedSettings.notifications,
                  invoiceReminders: e.target.checked,
                },
              })
            }
            disabled={!isEditing}
            className="mr-2"
          />
          Factuur Herinneringen
        </label>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={editedSettings.notifications.taskReminders}
            onChange={(e) =>
              setEditedSettings({
                ...editedSettings,
                notifications: {
                  ...editedSettings.notifications,
                  taskReminders: e.target.checked,
                },
              })
            }
            disabled={!isEditing}
            className="mr-2"
          />
          Taak Herinneringen
        </label>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={editedSettings.notifications.marketingUpdates}
            onChange={(e) =>
              setEditedSettings({
                ...editedSettings,
                notifications: {
                  ...editedSettings.notifications,
                  marketingUpdates: e.target.checked,
                },
              })
            }
            disabled={!isEditing}
            className="mr-2"
          />
          Marketing Updates
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={editedSettings.security.twoFactorAuth}
            onChange={(e) =>
              setEditedSettings({
                ...editedSettings,
                security: {
                  ...editedSettings.security,
                  twoFactorAuth: e.target.checked,
                },
              })
            }
            disabled={!isEditing}
            className="mr-2"
          />
          Twee-factor Authenticatie
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sessie Timeout (minuten)
        </label>
        <input
          type="number"
          value={editedSettings.security.sessionTimeout}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              security: {
                ...editedSettings.security,
                sessionTimeout: parseInt(e.target.value),
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Wachtwoord Vervaltijd (dagen)
        </label>
        <input
          type="number"
          value={editedSettings.security.passwordExpiry}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              security: {
                ...editedSettings.security,
                passwordExpiry: parseInt(e.target.value),
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          IP Whitelist
        </label>
        <textarea
          value={editedSettings.security.ipWhitelist.join('\n')}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              security: {
                ...editedSettings.security,
                ipWhitelist: e.target.value.split('\n'),
              },
            })
          }
          disabled={!isEditing}
          rows={3}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Thema
        </label>
        <select
          value={editedSettings.appearance.theme}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              appearance: {
                ...editedSettings.appearance,
                theme: e.target.value as Settings['appearance']['theme'],
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        >
          <option value="light">Licht</option>
          <option value="dark">Donker</option>
          <option value="system">Systeem</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Taal
        </label>
        <select
          value={editedSettings.appearance.language}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              appearance: {
                ...editedSettings.appearance,
                language: e.target.value,
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        >
          <option value="nl">Nederlands</option>
          <option value="en">Engels</option>
          <option value="de">Duits</option>
          <option value="fr">Frans</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tijdzone
        </label>
        <select
          value={editedSettings.appearance.timezone}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              appearance: {
                ...editedSettings.appearance,
                timezone: e.target.value,
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        >
          <option value="Europe/Amsterdam">Europe/Amsterdam</option>
          <option value="Europe/London">Europe/London</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Datum Formaat
        </label>
        <select
          value={editedSettings.appearance.dateFormat}
          onChange={(e) =>
            setEditedSettings({
              ...editedSettings,
              appearance: {
                ...editedSettings.appearance,
                dateFormat: e.target.value,
              },
            })
          }
          disabled={!isEditing}
          className="w-full p-2 border rounded-md"
        >
          <option value="DD-MM-YYYY">DD-MM-YYYY</option>
          <option value="MM-DD-YYYY">MM-DD-YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return renderCompanySettings();
      case 'billing':
        return renderBillingSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Instellingen</h2>
            {isEditing ? (
              <div className="space-x-3">
                <button
                  onClick={() => {
                    setEditedSettings(settings);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Annuleren
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Opslaan
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Bewerken
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-6">{renderContent()}</div>
        </div>
      </div>
    </MainLayout>
  );
} 