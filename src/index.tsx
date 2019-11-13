import React from "react";
import ReactDOM from "react-dom";

// this interface describes the structure of the initial state defined in the component below
interface AppState {
  grid: number[][];
  playable: number[];
  winner: number;
  player1: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      grid: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      playable: [5, 5, 5, 5, 5, 5, 5],
      winner: 0,
      player1: true
    };
  }

  turn = (columnIndex: number): void => {
    if (this.state.winner < 1) {
      let rowIndex = this.state.playable[columnIndex];
      let player = this.state.player1 ? 1 : 2;

      //dropping the disc
      const newGrid = this.state.grid.slice();
      newGrid[rowIndex][columnIndex] = player;
      this.setState({ grid: newGrid });

      //updating the playable squares array
      const newPlayable = this.state.playable.slice();
      newPlayable[columnIndex] = rowIndex - 1;
      this.setState({ playable: newPlayable });

      this.checkWin(rowIndex, columnIndex, player);

      // toggle player
      this.setState({ player1: !this.state.player1 });
    }
  };

  checkWin = (row: number, col: number, player: number): void => {
    let grid = this.state.grid;

    // horizontal
    const checkHorizontal = (row: number): void => {
      let line = 0;
      for (let col = 0; col < 7; col++) {
        grid[row][col] === player ? line++ : (line = 0);
        if (line > 3) this.setState({ winner: player });
      }
    };

    // vertical: we only need to check downwards
    if (row < 3) {
      if (
        grid[row][col] === player &&
        grid[row + 1][col] === player &&
        grid[row + 2][col] === player &&
        grid[row + 3][col] === player
      ) {
        this.setState({ winner: player });
      }
    }

    //diagonal
    const valid = (row: number, column: number): boolean => {
      if (row < 6 && row > 0 && column > 0 && column < 7) {
        return true;
      } else {
        return false;
      }
    };

    const checkDiagonal = (row: number, col: number): void => {
      let line = 1;

      //up and right
      for (let i = 1; i < 4; i++) {
        if (valid(row - i, col + i) && grid[row - i][col + i] === player) {
          line++;
        } else {
          line = 1;
        }
        if (line > 3) this.setState({ winner: player });
      }

      //down and left
      for (let i = 1; i < 4; i++) {
        if (valid(row + i, col - i) && grid[row + i][col - i] === player) {
          line++;
        } else {
          line = 1;
        }
        if (line > 3) this.setState({ winner: player });
      }

      //down and right
      for (let i = 1; i < 4; i++) {
        if (valid(row + i, col + i) && grid[row + i][col + i] === player) {
          line++;
        } else {
          line = 1;
        }
        if (line > 3) this.setState({ winner: player });
      }

      //up and left
      for (let i = 1; i < 4; i++) {
        if (valid(row - i, col - i) && grid[row - i][col - i] === player) {
          line++;
        } else {
          line = 1;
        }
        if (line > 3) this.setState({ winner: player });
      }
    };

    checkHorizontal(row);
    checkDiagonal(row, col);
  };

  reset = (): void => {
    this.setState({
      grid: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      playable: [5, 5, 5, 5, 5, 5, 5],
      winner: 0
    });
  };

  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <h2>It is Player {this.state.player1 ? 1 : 2}'s turn!</h2>
        <div className="grid-container">
          {this.state.playable.map((col, index: number) => (
            <button
              key={index}
              className="drop"
              onClick={() => this.turn(index)}
            >
              drop
            </button>
          ))}
          {this.state.grid.map((row, rowIndex: number) => (
            <ul className="row" key={rowIndex}>
              {row.map(
                (val, columnIndex: number): JSX.Element => {
                  if (val === 1) {
                    return <div key={columnIndex} className="disc player1" />;
                  }
                  if (val === 2) {
                    return <div key={columnIndex} className="disc player2" />;
                  }
                  return <div key={columnIndex} className="disc" />;
                }
              )}
            </ul>
          ))}

          {this.state.winner === 0 ? null : (
            <div>
              <h2>
                Player {this.state.winner} has won!
                <button onClick={() => this.reset()}>reset!</button>
              </h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
