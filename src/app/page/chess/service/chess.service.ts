// chess.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chess } from 'chess.js';
import { WebsocketService } from '../../../services/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
  private gameStateSubject = new BehaviorSubject<any>(null);
  public gameState$ = this.gameStateSubject.asObservable();
  private chess = new Chess();
  private playerColor: 'w' | 'b' | null = null;

  constructor(private websocketService: WebsocketService) {
    // this.websocketService.messages$.subscribe((message) => {
    //   this.handleMessage(message);
    // });
  }
  

  // public joinGame(gameId: string): void {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     try {
  //       const userObj = JSON.parse(user);
  //       this.websocketService.sendMessage({
  //         type: 'joinWithUser',
  //         gameId,
  //         userId: userObj.id
  //       });
  //     } catch (e) {
  //       console.error('Error parsing user', e);
  //       this.websocketService.connect(gameId);
  //     }
  //   } else {
  //     this.websocketService.connect(gameId);
  //   }
  // }

  // public makeMove(move: { from: string; to: string }): void {
  //   this.websocketService.sendMessage({
  //     type: 'makeMove',
  //     move,
  //   });
  // }

  // public resign(): void {
  //   this.websocketService.sendMessage({
  //     type: 'resignGame',
  //   });
  // }

  // public offerDraw(): void {
  //   this.websocketService.sendMessage({
  //     type: 'offerDraw',
  //   });
  // }

  // public acceptDraw(): void {
  //   this.websocketService.sendMessage({
  //     type: 'acceptDraw',
  //   });
  // }

  // private handleMessage(message: any): void {
  //   switch (message.type) {
  //     case 'gameState':
  //       this.chess.load(message.fen);
  //       this.playerColor = message.playerColor;
  //       this.gameStateSubject.next({
  //         fen: message.fen,
  //         playerColor: this.playerColor,
  //         turn: this.chess.turn(),
  //         isGameOver: this.chess.isGameOver(),
  //         board: this.getBoard(),
  //       });
  //       break;
  //     case 'moveMade':
  //       this.chess.load(message.fen);
  //       this.gameStateSubject.next({
  //         fen: message.fen,
  //         playerColor: this.playerColor,
  //         turn: this.chess.turn(),
  //         isGameOver: this.chess.isGameOver(),
  //         board: this.getBoard(),
  //       });
  //       break;
  //     case 'gameEnded':
  //       this.gameStateSubject.next({
  //         ...this.gameStateSubject.value,
  //         isGameOver: true,
  //         gameResult: message,
  //       });
  //       break;
  //     // Agrega más casos según necesites
  //   }
  // }
  
  // public disconnect(): void {
  //   this.websocketService.disconnect();
  // }

  // private getBoard(): any[] {
  //   const board = [];
  //   for (let i = 0; i < 8; i++) {
  //     const row = [];
  //     for (let j = 0; j < 8; j++) {
  //       const square = String.fromCharCode(97 + j) + (8 - i);
  //       const piece = this.chess.get(square as any);
  //       row.push({
  //         square,
  //         piece,
  //         color: (i + j) % 2 === 0 ? 'white' : 'black',
  //       });
  //     }
  //     board.push(row);
  //   }
  //   return board;
  // }
}
