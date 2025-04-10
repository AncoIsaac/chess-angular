import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnDestroy {
  timeLeft = signal(1 * 60);
  isActive = signal(false);
  private intervalId: any;

  constructor() {
    effect(() => {
      if (this.isActive() && this.timeLeft() > 0) {
        this.startInterval();
      } else if (this.timeLeft() === 0) {
        this.clearInterval();
        // Efecto visual ya manejado con la clase timeEnd
        setTimeout(() => this.resetTimer(), 1000);
      }
    });
  }

  startInterval() {
    this.clearInterval();
    this.intervalId = setInterval(() => {
      this.timeLeft.update(prev => prev - 1);
    }, 1000);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startTimer() {
    this.isActive.set(true);
  }

  pauseTimer() {
    this.isActive.set(false);
    this.clearInterval();
  }

  resetTimer() {
    this.isActive.set(false);
    this.timeLeft.set(1 * 60);
    this.clearInterval();
  }

  formatTime(): string {
    const minutes = Math.floor(this.timeLeft() / 60);
    const seconds = this.timeLeft() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    this.clearInterval();
  }
}
