export const CheckWin = (
  row: number,
  col: number,
  player: number,
  grid: number[][]
): boolean => {
  // horizontal
  const checkHorizontal = (row: number): boolean => {
    let line = 0;
    for (let col = 0; col < 7; col++) {
      grid[row][col] === player ? line++ : (line = 0);
      if (line > 3) return true;
    }
    return false;
  };

  // vertical: we only need to check downwards
  if (row < 3) {
    if (
      grid[row][col] === player &&
      grid[row + 1][col] === player &&
      grid[row + 2][col] === player &&
      grid[row + 3][col] === player
    ) {
      return true;
    }
  }

  // diagonal validation
  const valid = (row: number, column: number): boolean => {
    if (row < 6 && row >= 0 && column >= 0 && column < 7) {
      return true;
    } else {
      return false;
    }
  };

  // diagonal
  const checkDiagonal = (row: number, col: number): boolean => {
    let lineUp: number = 0;
    let lineDown: number = 0;

    //up and right, down and left
    for (let i = -4; i < 4; i++) {
      if (valid(row - i, col + i) && grid[row - i][col + i] === player) {
        lineUp++;
      } else {
        lineUp = 0;
      }
      if (lineUp > 3) {
        return true;
      }
    }

    //down and right, up and left
    for (let i = -4; i < 4; i++) {
      if (valid(row + i, col + i) && grid[row + i][col + i] === player) {
        lineDown++;
      } else {
        lineDown = 0;
      }
      if (lineDown > 3) {
        return true;
      }
    }
    return false;
  };
  if (checkDiagonal(row, col) || checkHorizontal(row)) {
    return true;
  }
  return false;
};
