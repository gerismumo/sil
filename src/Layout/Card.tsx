import React from 'react';

type Props = {
    children: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-white shadow-card rounded-lg border border-gray-200 max-w-sm mx-auto">
      {children}
    </div>
  );
};

export default Card;
