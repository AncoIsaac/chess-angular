import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  LucideAngularModule,
  Menu,
  Home,
  PlayCircle,
  FileText,
} from 'lucide-angular';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItemI } from './interface/links/links';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule, NgIf, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isCollapsed = true;
  @ViewChild('sidebarContainer') sidebarContainer!: ElementRef;

  menu = Menu;

  menuItems: MenuItemI[] = [
    { icon: Home, label: 'Inicio', route: '/home' },
    { icon: PlayCircle, label: 'chess', route: '/home/chess' },
    { icon: FileText, label: 'test', route: '/home/test' },
    // { icon: Settings, label: 'Configuración', route: '/settings' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isRouteActive(route: string = ''): boolean {
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  navigateTo(route?: string) {
    if (route) {
      this.router.navigate([route]);
      this.isCollapsed = true; // Optional: collapse after navigation
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.sidebarContainer.nativeElement.contains(event.target)) {
      this.isCollapsed = true;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.isCollapsed = true;
  }
}
