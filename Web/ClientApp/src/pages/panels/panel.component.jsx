import React, {useState} from 'react';
import UserHeader from './user/components/header/userHeader.component';
import ShopHeader from './shop/components/header/shopHeader.component';

const Panel = ({children, type}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="d-flex w-100">
      {type === 'user' ? (
        <UserHeader open={open} setOpen={(value) => setOpen(value)}>
          {children}
        </UserHeader>
      ) : (
        <ShopHeader open={open} setOpen={(value) => setOpen(value)}>
          {children}
        </ShopHeader>
      )}
    </div>
  );
}

export default Panel;
