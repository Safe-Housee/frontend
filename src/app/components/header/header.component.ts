import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = ''
  constructor(private route: Router) { }

  ngOnInit(): void {
    
  }

  isLogged() {
    this.userName = sessionStorage.getItem('nmUsuario') || '';
    if(sessionStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }
}
