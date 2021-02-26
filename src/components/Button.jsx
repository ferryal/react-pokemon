/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx } from '@emotion/react';

const Button = (props) => {
  const {
    text, style, onClick, ...restProps
  } = props;

  return (
    <button
      css={{
        padding: '10px',
        fontSize: '14px',
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid green',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {
          opacity: '0.5',
        },
        ...style,
      }}
      onClick={onClick}
      {...restProps}
    >
      {text}
    </button>
  );
};

export default Button;
