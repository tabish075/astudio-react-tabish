// /src/components/Tabs.js
import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button onClick={() => onTabChange('ALL')} className={activeTab === 'ALL' ? 'active' : ''}>
        ALL
      </button>
      <button onClick={() => onTabChange('Laptops')} className={activeTab === 'Laptops' ? 'active' : ''}>
        Laptops
      </button>
    </div>
  );
};

export default Tabs;
