import React, { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      Layout
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
