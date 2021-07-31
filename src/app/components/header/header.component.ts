import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  isLogged() {
    if(localStorage['token']) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    delete localStorage['token'];
    delete localStorage['cdUsuario'];
    delete localStorage['nmUsuario'];
    this.route.navigate(['/login']);
  }
}
