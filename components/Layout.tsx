import React, { ReactComponentElement } from 'react';
import Header from './Header';

interface PropsType {
  children: ReactComponentElement<any>;
}

const Layout = ({ children }: PropsType) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
