import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  message = '';
  private messageSub!: Subscription;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect();
    this.messageSub = this.websocketService.getMessage().subscribe(
      messages => {
        this.messages.push(messages);
      }
    );
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const chatMessage = {
        content: this.message,
        sender: localStorage.getItem('user')
      };
      this.websocketService.sendMessage(chatMessage);
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
    this.websocketService.disconnect();
  }
}