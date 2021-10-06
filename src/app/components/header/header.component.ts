import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/utils/storage';
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
    this.userName = usuario.getNmUsuario() || '';
    if(sessionStorage.getItem('token') && sessionStorage.getItem('cdUsuario')) {
      return true;
    } else {
      return false;
    }
  }

  showReportMenu(): boolean {
    const email = usuario.getUserEmail();
    if(email) {
      const domain = email.split('@');
      return domain[1] === "safehouse.com";
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }
}
