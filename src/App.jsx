import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx'
import { turns} from './constants'
import { checkWinnerFrom } from './logics/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState( ()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage? JSON.parse(boardFromStorage): Array(9).fill(null)
  })
  const [turn, setTurn] = useState( ()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.x
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square)=> square !== null)
  }

  const updateBoard = (index) =>{
    if (board[index] || winner) return;
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn)
    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn)
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame (newBoard)) {
      setWinner(false)
    }
  }
  return (
    <main className="board">
      <h1>Tres en Línea</h1>
      <button onClick={resetGame} >Restart</button>
      <section className="game">
        {
          board.map((_ , index) =>{
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected = {turn ===turns.X}>
          {turns.X}
        </Square>
        <Square isSelected = {turn ===turns.O}>
          {turns.O}
        </Square>
      </section>
      <WinnerModal resetGame= {resetGame} winner={winner} />
    </main>
    
  )
}

export default App
