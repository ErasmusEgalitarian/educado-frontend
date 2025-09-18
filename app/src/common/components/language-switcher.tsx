import { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const currentLanguage = i18n.language;
  const getCurrentLanguageLabel = () => {
    return currentLanguage === 'pt' ? t('language.portuguese') : t('language.english');
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#166276]"
        onClick={() => { setIsOpen(!isOpen); }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getCurrentLanguageLabel()}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                currentLanguage === 'pt' ? 'bg-gray-50 text-[#166276] font-medium' : 'text-gray-700'
              }`}
              role="menuitem"
              onClick={() => { changeLanguage('pt'); }}
            >
              🇧🇷 {t('language.portuguese')}
            </button>
            <button
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                currentLanguage === 'en' ? 'bg-gray-50 text-[#166276] font-medium' : 'text-gray-700'
              }`}
              role="menuitem"
              onClick={() => { changeLanguage('en'); }}
            >
              🇺🇸 {t('language.english')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};