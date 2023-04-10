import React from 'react';
import './Button.css';

function Button(props: any) {
  const { className } = props;
  return <button type="button" {...props} className={`button ${className}`} />;
}

export default Button;
