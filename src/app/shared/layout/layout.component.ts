import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { Sidebar } from '../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, Sidebar, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class Layout {}
