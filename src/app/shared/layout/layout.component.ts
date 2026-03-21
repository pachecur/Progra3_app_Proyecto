import { Component } from '@angular/core';
import { HeaderComponent as Header} from '../components/header/header.component';
import { SidebarComponent as Sidebar } from '../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
