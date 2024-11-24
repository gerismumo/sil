import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className="flex flex-row justify-center">
        <div  className="px-[10px] sm:px-[20px] md:px-[60px] lg:px-[100px] w-[100%] max-w-[1400px]">
        {children}
        </div>
    </div>
  );
};

export default Container;
