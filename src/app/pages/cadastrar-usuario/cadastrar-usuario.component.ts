import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  criarUsuario: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.criarUsuario = new FormGroup({
      ds_email: new FormControl('', [Validators.required]),
      ds_emailConfirmation: new FormControl('', [Validators.required]),
      cd_telefone: new FormControl('', [Validators.required]),
      nm_usuario: new FormControl('', [Validators.required]),
      cd_senha: new FormControl('', [Validators.required]),
      dt_nascimento: new FormControl('', [Validators.required]),
      cd_senhaConfirmation: new FormControl('', [Validators.required]),
    });
  }

  canCreateUser() {
    console.log(this.criarUsuario.valid)
    return !this.criarUsuario.valid
  }

  submit() {
    // criar payload
    // chamar service
  }
}
