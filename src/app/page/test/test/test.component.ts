import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit, OnDestroy  {
  connectionStatus = 'Desconectado';

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.wsService.messages$.subscribe({
      next: (message) => {
        console.log('Mensaje recibido:', message);
        // Actualiza tu UI según los mensajes recibidos
      },
      error: (err) => console.error('Error:', err)
    });
  }

  connect() {
    this.wsService.connect('d72e13eb-e05c-4cff-a325-e1523e35e392');
    this.connectionStatus = 'Conectando...';
  }

  sendMove() {
    this.wsService.sendMessage('playerMove', { 
      gameId: 'd72e13eb-e05c-4cff-a325-e1523e35e392',
      move: 'A1' 
    });
  }

  ngOnDestroy() {
    this.wsService.disconnect();
  }
}