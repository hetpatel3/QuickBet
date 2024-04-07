// 1) we collect user input
// 2)

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOL_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const prompt = require("prompt-sync")();

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    depositAmountInNumber = parseFloat(depositAmount);

    if (isNaN(depositAmountInNumber) || depositAmountInNumber <= 0) {
      console.log("Enter a valid amount, Please Try Again.");
    } else {
      return depositAmountInNumber;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const totalLines = prompt("Enter Number Of Lines to bet on (1-3): ");
    totleNumberOfLinesInNumber = parseFloat(totalLines);

    if (
      isNaN(totleNumberOfLinesInNumber) ||
      totleNumberOfLinesInNumber <= 0 ||
      totleNumberOfLinesInNumber > 3
    ) {
      console.log("Enter a valid number of lines, Please Try Again.");
    } else {
      return totleNumberOfLinesInNumber;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per lines: ");
    betInNumber = parseFloat(bet);

    if (
      isNaN(betInNumber) ||
      betInNumber <= 0 ||
      betInNumber > (balance / lines)
    ) {
      console.log("Incorrect Bet, Please Try Again.");
    } else {
      return betInNumber;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < ROWS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinning = (rows, bet, lines) => {
  let winning = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winning += bet * SYMBOL_VALUE[symbols[0]];
    }
  }
  return winning;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("you have balance of " + balance);
    const totalLines = getNumberOfLines();
    const bet = getBet(balance, totalLines);
    balance -= (bet * totalLines);
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinning(rows, bet, totleNumberOfLinesInNumber);
    balance += winnings;
    console.log("you won," + winnings.toString());

    if(balance <= 0){
      console.log("you ran out of money!");
      break;
    }

    const playAgain = prompt("Do You Want to play again (y/n)? ");
    if(playAgain != "y") break;
  }
};

game();
