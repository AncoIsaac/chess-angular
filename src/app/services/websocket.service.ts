import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client;
  private messageSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws', 
      onConnect: () => {
        this.client.subscribe('/topic/public', message => {
          this.messageSubject.next(JSON.parse(message.body));
        });
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

  connect(): void {
    this.client.activate();
  }

  disconnect(): void {
    this.client.deactivate();
  }

  sendMessage(message: any): void {
    this.client.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(message)
    });
  }

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}