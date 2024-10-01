import { WINNER_COMBOS } from "../constants"


export const checkWinnerFrom = (boardToCheck) =>{
    //revisar las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
        if (
          boardToCheck[a] && //si en la posicion [a] hay un X - O
          boardToCheck[a] == boardToCheck[b] && //si la posicion [a] = en la siguiente
        boardToCheck[b] == boardToCheck[c]
        ){
            return boardToCheck[a]
        }
    }
    //si no hay ganador
    return null
}

export const checkEndGame = (newBoard) =>{

    //si todas las posiciones no son null significa que ha terminado el juego
    return newBoard.every((square) => square !== null)
}

