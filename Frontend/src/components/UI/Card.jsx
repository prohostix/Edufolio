import React from 'react';

const Card = ({ children, style }) => {
  return (
    <div style={{ 
      background: 'white', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0',
      ...style 
    }}>
      {children}
    </div>
  );
};
export default Card;