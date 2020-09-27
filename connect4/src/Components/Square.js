import React from 'react';

const style1 = {
  background: 'yellow',
  borderRadius: '50%',
  cursor: 'pointer',
  outline: '2px solid darkblue'
}
const style2 = {
  background: 'red',
  borderRadius: '50%',
  cursor: 'pointer',
  outline: '2px solid darkblue'
}
const style = {
  background: 'lightblue',
  cursor: 'pointer',
  outline: '2px solid darkblue'
}

const Square = ({ value, onClick }) => (
  <button style={value === 'Yellow' ? style1 : value === 'Red' ? style2 : style} onClick={onClick}>
  </button>
);

export default Square;