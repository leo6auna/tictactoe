import { WINNER_COMBOS } from "../constants"
export const checkWinnerFrom = (newBoard) =>{
    for(const combo of WINNER_COMBOS){
      const[a,b,c] = combo
      if(
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]

      ){
        return newBoard[a]
      }
    }
    //si no hay ganador:
    return null
  }