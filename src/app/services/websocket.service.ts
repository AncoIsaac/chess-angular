// websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocket;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000; // 2 segundos
  private gameId: string | null = null;

  constructor() {}

  public connect(gameId: string): void {
    this.gameId = gameId;
    this.establishConnection();
  }

  private establishConnection(): void {
    const wsUrl = 'ws://localhost:3000';
    this.socket = new WebSocket(`${wsUrl}`);

    // this.socket.onopen = () => {
    //   console.log('WebSocket connected');
    //   this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
    //   this.sendMessage({ type: 'joinGame', gameId: this.gameId });
    // };

    // this.socket.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   this.messagesSubject.next(message);
    // };

    // this.socket.onclose = (event) => {
    //   console.log('WebSocket disconnected', event);
    //   if (
    //     !event.wasClean &&
    //     this.reconnectAttempts < this.maxReconnectAttempts
    //   ) {
    //     setTimeout(() => {
    //       this.reconnectAttempts++;
    //       console.log(`Reconnecting attempt ${this.reconnectAttempts}`);
    //       this.establishConnection();
    //     }, this.reconnectDelay);
    //   }
    // };

    // this.socket.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };
  }

  public sendMessage(message: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
