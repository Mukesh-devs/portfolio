import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          &copy; {currentYear} Mukesh MK. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
          Designed & Built by Mukesh MK
        </p>
      </div>
    </footer>
  );
};

export default Footer;