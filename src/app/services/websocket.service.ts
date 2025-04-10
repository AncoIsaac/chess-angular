// websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Manager } from 'socket.io-client'; // Nuevo import

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: any;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();
  private gameId: string | null = null;

  constructor() {}

  public connect(gameId: string): void {
    this.gameId = gameId;
    this.establishConnection();
  }

  private establishConnection(): void {
    const manager = new Manager('http://localhost:3000', {
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      transports: ['websocket']
    });

    this.socket = manager.socket('/'); // Namespace raíz

    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
      this.socket.emit('joinGame', { game: this.gameId });
    });

    this.socket.on('message', (data: any) => {
      this.messagesSubject.next(data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });

    this.socket.on('connect_error', (error: any) => {
      console.error('Connection error:', error);
    });
  }

  public sendMessage(event: string, message: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, message);
    } else {
      console.warn('Socket not connected. Message not sent:', message);
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}