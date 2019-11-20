import React from "react";
import ReactDOM from "react-dom";
import { CheckWin } from "./CheckWin";

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
      playable: Array(7).fill(5),
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

      if (CheckWin(rowIndex, columnIndex, player, this.state.grid)) {
        this.setState({ winner: player });
      }
      // toggle player
      this.setState({ player1: !this.state.player1 });
    }
  };

  reset = (): void => {
    this.setState({
      grid: this.state.grid.map(row => row.map(disc => 0)),
      playable: this.state.playable.map(val => 5),
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
