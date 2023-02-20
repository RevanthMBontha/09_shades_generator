import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';

const SingleColor = ({ rgb, weight, index, hex }) => {
  const [displayAlert, setDisplayAlert] = useState(false);
  const bcg = rgb.join(',');
  const hexValue = `${rgbToHex(...rgb)}`;

  const handleClick = () => {
    setDisplayAlert(true);
    navigator.clipboard.writeText(hexValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayAlert(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [displayAlert]);
  return (
    <article
      className={`color ${index >= 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={handleClick}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{rgbToHex(...rgb)}</p>
      {displayAlert && (
        <p className={`alert color-value`}>copied to clipboard</p>
      )}
    </article>
  );
};

export default SingleColor;
