import { useState } from 'react'
import confetti from "canvas-confetti"

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame} from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameToStorage } from './logic/storage/index.js'



function App() {
  //1. dibujar Tablero
const [board, setBoard] = useState(() =>{
const boardFromStorage = window.localStorage.getItem('board')
  return boardFromStorage
    ?JSON.parse (boardFromStorage)
    :Array(9).fill(null)
})

  //2. estado para registrarjugada
const [turn, setTurn] =useState(()=>{
  const turnFromStorage =window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X
  
})

//2.1 estado para ganador
const [winner, setWinner] =useState(null) //null = no hay ganador i false = empate



const resetGame = () =>{
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
  resetGameToStorage()
}



const updateBoard = (index) =>{
  // 3. (VALIDACIONES)no actualizar esta posición si ya tiene algo
  if (board[index] || winner) return
  //4. actualizar el tablero
  const newBoard =[...board]
    newBoard[index] = turn // x u O
    setBoard(newBoard)
  /*
  los estados siempre tratarlos como immutables
  siempre un array o elemento nuevo
  PORQUE ESTO ESTÀ MAL (SPREAD Y REST OPERATOR)?
  */
  
  //5. Cambiar el turno
  const newTurn =turn == TURNS.X ?TURNS.O :TURNS.X
  setTurn(newTurn)
  saveGameToStorage({
    board: newBoard,
    turn: newTurn
  })


  //6. revisar si hay ganador
  const newWinner = checkWinnerFrom (newBoard)
  if (newWinner) {
    confetti()
      setWinner(newWinner) //actualiza el estado
  } else if (checkEndGame(newBoard)){
    setWinner(false) //empate
  }

}

  return (
    <main className='board'>
      <h1>Tres en Raya</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
                </Square>
            
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
          </Square>
        <Square isSelected={turn == TURNS.O}>
        {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}
  

export default App
