import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Landing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('landing.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            {t('landing.subtitle')}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {t('common.register')}
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              {t('common.login')}
            </Link>
          </div>
          
          <p className="mt-8 text-gray-600">
            {t('landing.alreadyHaveAccount')}
          </p>
        </div>
      </div>
    </div>
  );
};

