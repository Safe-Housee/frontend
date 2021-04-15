import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  
  criarUsuario: FormGroup;
  hide = true;
  showSenhaNotEqualMessage = false;
  showEmailNotEqualMessage = false;
  fileToUpload: File = null;

  constructor() { }

  ngOnInit(): void {
    this.criarUsuario = new FormGroup({
      ds_email: new FormControl('', [Validators.required, Validators.email]),
      ds_emailConfirmation: new FormControl('', [Validators.required, Validators.email]),
      cd_telefone: new FormControl('', [Validators.required]),
      nm_usuario: new FormControl('', [Validators.required]),
      cd_senha: new FormControl('', [Validators.required]),
      dt_nascimento: new FormControl('', [Validators.required]),
      cd_senhaConfirmation: new FormControl('', [Validators.required]),
    });
  }

  canCreateUser() {
    return !this.criarUsuario.valid && this.showEmailNotEqualMessage && this.showSenhaNotEqualMessage;
  }

  checkEqual(propName: string) {
    if(propName === 'senha') {
      const senhaIsOk = this.criarUsuario.value.cd_senha === this.criarUsuario.value.cd_senhaConfirmation;
      this.showSenhaNotEqualMessage = !senhaIsOk;
    }

    if(propName === 'email') {
      const emailIsOk = this.criarUsuario.value.ds_email === this.criarUsuario.value.ds_emailConfirmation;
      this.showEmailNotEqualMessage = !emailIsOk;
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  } 

  submit() {
    // criar payload
    // chamar service
  }
}
