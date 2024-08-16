import { WINNER_COMBOS } from "../constants.js";

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  //Aun no hay ganador
  return null;
};

export const checkEndGame = (boardToCheck) => {
  //Aqui lo que vamos a hacer es revisar si tiene espacios vacios, si no tiene y aun no hay ganador entonces es empate
  return boardToCheck.every((element) => element !== null);
};
