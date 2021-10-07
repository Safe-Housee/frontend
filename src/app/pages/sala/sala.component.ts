import { ApplicationRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { gameId } from 'src/app/enums/gameId';
import { SalasService } from 'src/app/services/salas/salas.service';
import { partida, usuario } from 'src/app/utils/storage';
import { ConfirmSalaComponent } from '../confirm-sala/confirm-sala.component';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  partidas: any = [];
  partidaForm: any;
  csgo: boolean = false;
  lol: boolean = false;
  tekken: boolean = false;
  empty: boolean = false;
  propsToSetFalse = ['csgo', 'lol', 'tekken'];
  searchName: string;
  showLoading: boolean = false;

  constructor(
    private partidasService: SalasService, 
    private _snackBar: MatSnackBar, 
    private route: Router,
    private appRef: ApplicationRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectLoadMehod('default');
    this.iniciarFormulario();
    if(partida.getPartida()) {
      this.salaDeEspera(Number(partida.getPartida()));
    }
  }

  iniciarFormulario(): void {
    this.partidaForm = new FormGroup({
      cd_jogo: new FormControl(null, [Validators.required]),
      nm_partida: new FormControl(null, [Validators.required]),
      cd_usuario: new FormControl(usuario.getUsuario(), [Validators.required]),
      ds_nivel: new FormControl(null, [Validators.required])
    });
  }

  submit(): void {
    const date = new Date();
    const payload = {
      dt_partida: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
      hr_partida: `${date.getHours()}:${date.getMinutes()}`,
      ...this.partidaForm.value
    };
    this.partidasService.criarPartida(payload).subscribe((res) => {
      this.openSnackBar('Sala criada com sucesso!');
      const btnModal: HTMLButtonElement = document.querySelector('#closeModal');
      btnModal.click();
      setTimeout(() => this.salaDeEspera(res.partida.cd_partida), 500);
    }, (err) => {
      console.log(err)
      this.openSnackBar('Erro ao criar a sala...');
    });
  }

  openDialog(cdPartida: number) {
    const partida = this.partidas.find(partida => partida.cd_partida === cdPartida);
    const donoPartida = partida.jogadores.find(jogador => jogador.donoPartida);
    const cdUsuario = usuario.getUsuario();
    if (donoPartida.cd_usuario === Number(cdUsuario)) return this.salaDeEspera(cdPartida);
    const dialogRef = this.dialog.open(ConfirmSalaComponent, {
      data: {
        cdPartida,
        cdUsuario: sessionStorage['cdUsuario']
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.salaDeEspera(cdPartida);
    });
  }

  openSnackBar(message: string, action = null) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  salaDeEspera(cdPartida: number) {
    this.route.navigate([`/salasdeespera/${cdPartida}`]);
  }

  changeValue(event: any) {
    const prop = event.target.value;

    for (const key of Object.keys(this)) {
      if(key !== prop && this.propsToSetFalse.includes(key) && prop !== 'empty') {
        this[key] = false;
      }
    }
    this[prop] = !this[prop];
    this.appRef.tick();
    this.selectLoadMehod('filter');
  }

  selectLoadMehod(type: string) {
    this.showLoading = true;
    this.partidas = [];
    if (type === 'filter') {
      this.loadPartidaComFiltros();
    }

    if (type === 'searchName') {
      this.loadPartidaByName();
    }

    if (type === 'default') {
      this.loadPartidas();
    }
    setTimeout(() => this.showLoading = false, 1000);
    
  }

  loadPartidaComFiltros() {
    let gameIdToSearch = 0;
    this.propsToSetFalse.forEach(game => {
      if(this[game]) {
        gameIdToSearch = gameId[game];
      }
    });

    this.partidasService.partidasPorFiltro(gameIdToSearch, this.empty).subscribe(res => {
      this.partidas = res.partidas;
    });
  }

  loadPartidaByName() {
    if(!this.searchName) {
      this.loadPartidas();
    } else {
      this.partidasService.partidasPorNome(this.searchName).subscribe(res => {
        this.partidas = res.partidas;
      });
    }
  }

  loadPartidas(): void {
    this.partidasService.getSalas().subscribe(res => {
      this.partidas = res.partidas;
    });
  }
}
