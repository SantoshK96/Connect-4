import React, { useState, useEffect } from 'react';
import Board from './Board';
import axios from 'axios';

const styles = {
  width: '200px',
  margin: '20px auto'
};
const textstyle = {
  width: '200px',
  margin: '20px auto',
  textAlign: 'center'
};

//function which calls a backend api to check game result
const calculateWinner = async (board) => {
  const res = await axios.post(`http://localhost:4000/checkWinner/`, {
    board
  });
  return res.data.result;
}


const Game = () => {
  useEffect(() => {
    handleRestart();
  }, []);

  const [board, setBoard] = useState(Array(42).fill(null));
  const [xIsNext, setXisNext] = useState(true);



  //method which resets the game
  const handleRestart = async () => {
    await axios.post(`http://localhost:4000/restart`, {
    });
    setBoard(Array(42).fill(null));
    setXisNext('Yellow');
  }
  //method which handles user click
  const handleClick = async (i) => {
    const boardCopy = [...board];
    const res = await axios.post(`http://localhost:4000/posts/`, {
      position: i,
      player: !xIsNext
    });
    setXisNext(!xIsNext);
    const pos = Number(res.data.position);
    boardCopy[pos] = xIsNext ? 'Yellow' : 'Red';
    setBoard(boardCopy);
  }
  //function call to check results of game
  calculateWinner(board).then((result) => {
    if (result === true) {
      alert("Hurray " + (!xIsNext ? 'Yellow' : 'Red') + " Wins");
      handleRestart();
    }
  });

  const renderMoves = () => (
    <button style={styles} onClick={handleRestart}>
      Start Game
    </button>
  )
  return (
    <>
      <Board squares={board} onClick={handleClick} />
      <div style={styles}>
        <p style={textstyle}>{'Next Player: '}</p>
        <p style={textstyle}>{(xIsNext ? 'Yellow' : 'Red')}</p>
        {renderMoves()}
      </div>
    </>
  )
}

export default Game;