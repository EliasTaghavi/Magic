import React, {useState} from 'react';
import UserHeader from './user/components/header/userHeader.component';
import ShopHeader from '../../../pages/panels/shop/components/header/shopHeader.component';

const Panel = ({children, type}) => {
  const [open, setOpen] = useState(false);
  if (type === 'user') {
    return (
       <UserHeader open={open} setOpen={(value) => setOpen(value)}>
         {children}
       </UserHeader>
    )
  }  else {
    return (
       <ShopHeader>
         {children}
       </ShopHeader>
    );
  }
}

export default Panel;
