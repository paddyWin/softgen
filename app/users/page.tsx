'use client';

import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Jan Janssen',
    email: 'jan@bedrijf.nl',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-02-15 14:30',
    permissions: ['all'],
  },
  {
    id: '2',
    name: 'Piet Peters',
    email: 'piet@bedrijf.nl',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-02-14 09:15',
    permissions: ['read', 'write', 'manage_users'],
  },
  {
    id: '3',
    name: 'Anna Bakker',
    email: 'anna@bedrijf.nl',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-02-10 16:45',
    permissions: ['read', 'write'],
  },
];

const availablePermissions = [
  { id: 'read', label: 'Lezen' },
  { id: 'write', label: 'Schrijven' },
  { id: 'manage_users', label: 'Gebruikers Beheren' },
  { id: 'manage_billing', label: 'Facturatie Beheren' },
  { id: 'view_reports', label: 'Rapporten Bekijken' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setEditedUser({ ...user });
    setEditMode(true);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setEditMode(false);
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!editedUser) return;

    setUsers(
      users.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    setIsModalOpen(false);
    setEditMode(false);
    setEditedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: User['status']) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Gebruikers</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Nieuwe Gebruiker
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Zoek gebruikers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 p-2 border rounded-md"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Naam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Laatste Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Bewerk
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Verwijder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* User Modal */}
          {isModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {editMode ? 'Gebruiker Bewerken' : 'Gebruiker Details'}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {editMode && editedUser ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Naam
                        </label>
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, name: e.target.value })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, email: e.target.value })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rol
                        </label>
                        <select
                          value={editedUser.role}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              role: e.target.value as User['role'],
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="user">Gebruiker</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={editedUser.status}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              status: e.target.value as User['status'],
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="active">Actief</option>
                          <option value="inactive">Inactief</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Permissies
                        </label>
                        <div className="space-y-2">
                          {availablePermissions.map((permission) => (
                            <label
                              key={permission.id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                checked={editedUser.permissions.includes(
                                  permission.id
                                )}
                                onChange={(e) => {
                                  const newPermissions = e.target.checked
                                    ? [...editedUser.permissions, permission.id]
                                    : editedUser.permissions.filter(
                                        (p) => p !== permission.id
                                      );
                                  setEditedUser({
                                    ...editedUser,
                                    permissions: newPermissions,
                                  });
                                }}
                                className="mr-2"
                              />
                              {permission.label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 border rounded-md hover:bg-gray-50"
                        >
                          Annuleren
                        </button>
                        <button
                          onClick={handleSaveUser}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Opslaan
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Naam
                          </label>
                          <p>{selectedUser.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Email
                          </label>
                          <p>{selectedUser.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Rol
                          </label>
                          <p>{selectedUser.role}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Status
                          </label>
                          <p>{selectedUser.status}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Laatste Login
                          </label>
                          <p>{selectedUser.lastLogin}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Permissies
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                            >
                              {
                                availablePermissions.find(
                                  (p) => p.id === permission
                                )?.label
                              }
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 border rounded-md hover:bg-gray-50"
                        >
                          Sluiten
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 