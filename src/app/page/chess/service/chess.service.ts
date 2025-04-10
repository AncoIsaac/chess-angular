// chess.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chess } from 'chess.js';
import { WebsocketService } from '../../../services/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
}
