import React from 'react';

const Divider = ({className}) => {
  return (
    <div className={`w-100 d-flex centered my-2 ${className}`}>
      <div className="divider"/>
    </div>
  );
}

export default Divider;
