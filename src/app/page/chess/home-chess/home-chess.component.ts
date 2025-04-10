import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chess } from 'chess.js';

@Component({
  selector: 'app-home-chess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-chess.component.html',
  styleUrl: './home-chess.component.css',
})
export class HomeChessComponent {
  game!: Chess;
  board: any[] = [];
  selectedSquare: string | null = null;
  possibleMoves: string[] = [];

  getPieceSymbol(piece: any): string {
    const symbols: any = {
      p: '♙', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚',
      P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔'
    };
    return symbols[piece.type] || '';
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Chess();
    this.updateBoard();
  }

  updateBoard() {
    this.board = [];
    for (let i = 0; i < 64; i++) {
      const row: any[] = [];
      for (let j = 0; j < 8; j++) {
        const square = String.fromCharCode(97 + j) + (8 - i);
        const piece = this.game.get(square as any);
        row.push({
          square,
          piece: piece ? piece : null,
          color: this.getSquareColor(i, j),
        });
      }
      this.board.push(row);
    }
  }

  getSquareColor(row: number, col: number): string {
    return (row + col) % 2 === 0 ? 'white' : 'black';
  }

  onSquareClick(square: string, piece: any) {
    // Si ya hay una pieza seleccionada, intenta mover
    if (this.selectedSquare) {
      this.tryMove(this.selectedSquare, square);
      this.selectedSquare = null;
      this.possibleMoves = [];
    } 
    // Si no hay pieza seleccionada pero se clickeó una pieza del color correcto
    else if (piece && piece.color === this.game.turn()) {
      this.selectedSquare = square;
      this.possibleMoves = this.game.moves({
        square: square as any,
        verbose: true
      }).map((move: { to: string }) => move.to);
    }
  }


  tryMove(from: string, to: string) {
    try {
      
      const move = this.game.move({
        from,
        to,
        promotion: 'q',
      });
  
      if (move) {
        this.updateBoard();
        this.checkGameStatus();
      }
    } catch (error) {
      console.log('error', error)
      this.updateBoard();

    }
  }

  checkGameStatus() {
    if (this.game.isGameOver()) {
      let message = 'juego terminado';
      if (this.game.isCheckmate()) {
        message += ` jaque mate! Ganador: ${this.game.turn() === 'w' ? 'Negras' : 'Blanclas'} `; 
      } else if (this.game.isDraw()) {
        message += ' empate!';
      } else {
        message += 'jaque!';
      }
      setTimeout(() => {
        alert(message);
        this.newGame();
      }, 500);
    } else if (this.game.isCheck()) {
      console.log(`Jaque a las ${this.game.turn() === 'w' ? 'blancas' : 'negras'}`);
    }
  }
}
