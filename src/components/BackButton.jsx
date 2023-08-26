import React from 'react';
import { config } from '../logic/constants';

const BackButton = () => {
  return (
    <div>
    <button
      onClick={() => window.location.href = config.base + "/#/quiz"}
      className="absolute top-4 left-4 p-2 text-primary btn-ghost"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
    </div>
  );
};

export default BackButton;