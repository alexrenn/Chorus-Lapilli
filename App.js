import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  // keep track of which move. After 5, 6, do not add new pieces
  const [currentMove, setCurrentMove] = useState(0); 
  const [firstClick, setFirstClick] = useState(null); // Tracks the first click in a move
  const [clickCount, setClickCount] = useState(0);

    //decide if there is a winner
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;  
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
  function handleClick(i) {
    if(winner) {
      //freeze the board
      return;
    }

    if(currentMove >5) { //curent move starts at 0
      //need two clicks
      //updateclickCount
      setClickCount(prevClickCount => (prevClickCount >= 1 ? 0 : prevClickCount + 1));
      console.log(clickCount);

        if(clickCount === 0) {
          setFirstClick(i);
          console.log("setfirstclick = " + i + "   (doesn't get updated until next click)")
        }
        if(clickCount === 1 ) 
        {
          console.log("setsecondclick = " + i + "  (doesn't get updated until next click)")
          const nextSquares = squares.slice();

          if(xIsNext && squares[firstClick] === 'X'  && squares[i] == null )
          {
            if(adjacentSquare(firstClick,i)) //if the second click is adjacent AND not already taken
            {
              if(squares[4] == 'X') { //next move must win or vacate the square
                  //temp update squares to check for winner
                  squares[i] = 'X';
                  squares[firstClick] = null;
                  if (!calculateWinner(squares) && firstClick != 4) {
                      squares[i] = null;
                      squares[firstClick] = 'X'
                  } else {
                    nextSquares[firstClick] = null; //remove first element
                    nextSquares[i] = 'X'; // add new element
                    setCurrentMove(prevMove => prevMove + 1);
                    setSquares(nextSquares);
                    setXIsNext(!xIsNext);
                  }
              }
              else {
                nextSquares[firstClick] = null; //remove first element
                nextSquares[i] = 'X'; // add new element
                setCurrentMove(prevMove => prevMove + 1);
                setSquares(nextSquares);
                setXIsNext(!xIsNext);
              }
            }
          }
          else if (!xIsNext && squares[firstClick] === 'O'  && squares[i] == null) {
            if(adjacentSquare(firstClick,i)) //if the second click is adjacent AND not already taken
            {
              if(squares[4] == 'O') { //next move must win or vacate the square
                //temp update squares to check for winner
                squares[i] = 'O';
                squares[firstClick] = null;
                if (!calculateWinner(squares) && firstClick != 4) {
                    squares[i] = null;
                    squares[firstClick] = 'O'
                } else {
                  nextSquares[firstClick] = null; //remove first element
                  nextSquares[i] = 'O'; // add new element
                  setCurrentMove(prevMove => prevMove + 1);
                  setSquares(nextSquares);
                  setXIsNext(!xIsNext);
                }
              }else {
               nextSquares[firstClick] = null; //remove first element
               nextSquares[i] = 'O'; //add new element
               setCurrentMove(prevMove => prevMove + 1);
               setSquares(nextSquares);
               setXIsNext(!xIsNext);
              }
            }
          }
        }
    }

    //regular tic tac toe
    else if (currentMove <= 5){
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      setCurrentMove(prevMove => prevMove + 1)
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function adjacentSquare(firstClick, secondClick){
  console.log("adjacent square 1st click: " + firstClick);

  console.log("adjacent square 2nd click: " + secondClick);
  let isAdjacent = false;
      if(firstClick == 0) { 
          if(secondClick== 1 || secondClick== 3 || secondClick== 4) {
              isAdjacent = true;
          }
      } else if(firstClick == 1) {
        if(secondClick== 0 || secondClick== 2 || secondClick== 3 || secondClick== 4 || secondClick== 5) {
          isAdjacent = true;
        }
      } else if(firstClick == 2) {
        if(secondClick== 1|| secondClick== 4 || secondClick== 5) {
          isAdjacent = true;
        }
      } else if(firstClick == 3) {
        if(secondClick== 0 || secondClick== 1 || secondClick== 4 || secondClick== 6 || secondClick== 7) {
          isAdjacent = true;
        }
      } else if(firstClick == 4) {
        if(secondClick== 0 || secondClick== 1 || secondClick== 2 || secondClick== 3 || secondClick== 5 || secondClick== 6 || secondClick== 7 || secondClick== 8) {
          isAdjacent = true;
        }
      } else if(firstClick == 5) {
        if(secondClick== 1 || secondClick== 2 || secondClick== 4 || secondClick== 7 || secondClick== 8) {
          isAdjacent = true;
        }
      } else if(firstClick == 6) {
        if(secondClick== 3 || secondClick== 4 || secondClick== 7) {
          isAdjacent = true;
        }
      } else if(firstClick == 7) {
        if(secondClick== 3 || secondClick== 4 || secondClick== 5 || secondClick==6 || secondClick== 8) {
          isAdjacent = true;
        }
      } else if(firstClick == 8) {
        if(secondClick== 4 || secondClick== 5 || secondClick== 7) {
          isAdjacent = true;
        }
      }

  console.log(isAdjacent);
  return isAdjacent;
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}