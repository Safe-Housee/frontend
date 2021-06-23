import { ApplicationRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  hide = false
  constructor(private appRef: ApplicationRef) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      senha: new FormControl(null, [Validators.required])
    });
    this.appRef.tick();
  }

  submit() {
    
  }
}
