import React from 'react';
import UserHeader from './user/components/header/userHeader.component';

const Panel = ({children, type}) => {
   return (
      <UserHeader type={type}>
         {children}
      </UserHeader>
   )
}

export default Panel;
