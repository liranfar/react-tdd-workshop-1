import React from 'react';
import Registration from './Registration';
import Game from './Game';
import { gameStatus } from './gameService';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      p1Name: '',
      p2Name: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
      currentPlayer: 'X',
      isTie: false,
      hasGameStarted: false,
    };
  }
  onNewGame = ({ p1Name, p2Name }) => {
    this.setState({ p1Name, p2Name, hasGameStarted: true });
  };

  handleCellClick = (rIndex, cIndex) => {
    const board = this.state.board.map(row => [...row]);

    const isCellNonEmpty = board[rIndex][cIndex] !== '';
    if (isCellNonEmpty) {
      return;
    }

    board[rIndex][cIndex] = this.state.currentPlayer;
    if (gameStatus(board) === this.state.currentPlayer) {
      this.setState({ winner: this.state.currentPlayer });
    }
    if (gameStatus(board) === '-') {
      this.setState({ isTie: true });
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({ board, currentPlayer: nextPlayer });
  };

  render() {
    return (
      <div className="App">
        {!this.state.hasGameStarted && <Registration onNewGame={this.onNewGame} />}
        {this.state.hasGameStarted && (
          <Game
            onCellClicked={this.handleCellClick}
            board={this.state.board}
            p1Name={this.state.p1Name}
            p2Name={this.state.p2Name}
            nextUser={this.state.currentPlayer}
          />
        )}
        {this.state.winner && (
          <div data-hook="winner-message">
            {`${this.state.winner === 'X' ? this.state.p1Name : this.state.p2Name} won!`}
          </div>
        )}
        {this.state.isTie && <div data-hook="tie-message">It&#39;s a tie!</div>}
      </div>
    );
  }
}
export default App;
