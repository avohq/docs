import React from 'react';

declare global {
  interface Window {
    _iub?: { cs?: { api?: { openPreferences?: () => void } } };
  }
}

const PrivacyChoicesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 14"
    width={30}
    height={14}
    aria-hidden="true"
  >
    <path
      d="M7 .5h16a6.5 6.5 0 0 1 0 13H7a6.5 6.5 0 0 1 0-13z"
      fill="#fff"
      stroke="#0066FF"
    />
    <path d="M17 .5h6a6.5 6.5 0 0 1 0 13H13z" fill="#0066FF" />
    <path
      d="M5.8 7.2l2.2 2.2L12 5"
      fill="none"
      stroke="#0066FF"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 4.5l5 5M24 4.5l-5 5"
      stroke="#fff"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </svg>
);

const PrivacyChoices = () => (
  <button
    type="button"
    onClick={() => window._iub?.cs?.api?.openPreferences?.()}
    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
  >
    Your Privacy Choices
    <PrivacyChoicesIcon />
  </button>
);

export default PrivacyChoices;
