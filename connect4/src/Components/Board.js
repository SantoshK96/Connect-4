import React from 'react';
import Square from './Square';

const style = {
  boarder: '4px solid darkblue',
  background: 'lightblue',
  boarderRadius: '10px',
  width: '450px',
  height: '450px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(6,1fr) / repeat(7,1fr)'

};

const Board = ({ squares, onClick }) => (
  <div style={style}>
    {squares.map((square, i) => (
      <Square keys={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;