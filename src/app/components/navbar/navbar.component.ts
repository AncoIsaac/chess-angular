import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { LucideAngularModule, Bell, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showNotifications = false;
  @ViewChild('notificationsDropdown') notificationsDropdown!: ElementRef;

  notifications = [
    { id: 1, text: 'Nuevo mensaje recibido', time: 'Hace 5 minutos' },
    { id: 2, text: 'Tarea completada', time: 'Hace 1 hora' },
    { id: 3, text: 'Recordatorio: Reunión a las 3 PM', time: 'Hace 2 horas' }
  ];
  bellIcon = Bell;
  logOutIcon = LogOut;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.notificationsDropdown.nativeElement.contains(event.target)) {
      this.showNotifications = false;
    }
  }

 
}