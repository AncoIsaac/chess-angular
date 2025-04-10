import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LucideAngularModule, Menu, Home, Settings, Users, FileText } from 'lucide-angular';
import {  NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule,  NgIf, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = true;
  @ViewChild('sidebarContainer') sidebarContainer!: ElementRef;

  menu = Menu;
  
  menuItems = [
    { icon: Home, label: 'Inicio' },
    { icon: Users, label: 'Usuarios' },
    { icon: FileText, label: 'Documentos' },
    { icon: Settings, label: 'Configuración' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.sidebarContainer.nativeElement.contains(event.target)) {
      this.isCollapsed = true; 
    }
  }
}