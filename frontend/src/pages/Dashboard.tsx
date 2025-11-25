import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <div className="flex gap-4 items-center">
            <LanguageSwitcher />
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              {t('common.logout')}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t('dashboard.welcome')}
            </h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  {t('dashboard.userInfo')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{t('dashboard.email')}</p>
                    <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('dashboard.role')}</p>
                    <p className="text-lg font-semibold text-gray-900">{user.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('dashboard.memberSince')}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

