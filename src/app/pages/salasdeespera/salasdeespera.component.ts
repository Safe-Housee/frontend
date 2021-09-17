import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { VoteComponent } from 'src/app/components/vote/vote.component';
import { events } from 'src/app/enums/events';
import { statusPartida } from 'src/app/enums/statusPartida';
import { SalasService } from 'src/app/services/salas/salas.service';
import { partida, usuario } from 'src/app/utils/storage';

@Component({
  selector: 'app-salasdeespera',
  templateUrl: './salasdeespera.component.html',
  styleUrls: ['./salasdeespera.component.css']
})
export class SalasdeesperaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private salaService: SalasService, 
    private _snackBar: MatSnackBar, 
    private router: Router,
    public dialog: MatDialog,
    private socket: Socket) { }

  partida: any;
  cdPartida: number;
  isOwner: boolean = false;
  openVoteHasBeenCalled = false;

  ngOnInit(): void {
    this.cdPartida = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.loadPartida(this.cdPartida);
  }

  loadPartida(cdPartida: number) {
    this.salaService.partidaPorId(cdPartida).subscribe(async res => {
      this.partida = res;
      if (res.ds_status === statusPartida.FINALIDA) {
        if(!this.openVoteHasBeenCalled) {
          this.openVote();
          this.openVoteHasBeenCalled = true;
        }
        this.openSnackBar('Partida fechada, voltando para a lista de partidas...');
        partida.removerPartida();
        this.back();
      }
      this.checkIsOwner();
      const cdJogadores = this.partida.jogadores.map(jogador => jogador.cd_usuario);
      const cdJogador = Number(usuario.getUsuario());
      if (!cdJogadores.includes(cdJogador)){
        partida.removerPartida();
        this.back();
      }
    });
  }

  back() {
    this.router.navigate(['/sala']);
  }

  async exit() {
    try {
      if(this.isOwner) {
        await this.clearMatch();
        this.updateStatus('Finalizar');
      } else {
        this.salaService.sairDaPartida(this.cdPartida ,sessionStorage['cdUsuario']).subscribe(
          async () => {
            this.exitMatch()
            partida.removerPartida();
            this.back();
          },
          (error) => console.log(error));
      }
    } catch (error) {
      console.error(error)
    }
  }

  async clearMatch() {
    for (const jogador of this.partida.jogadores) {
      await this.salaService.sairDaPartida(this.cdPartida ,jogador.cd_usuario).pipe().toPromise();
    }
    this.updateStatus(statusPartida.FECHADA);
    partida.removerPartida();
  }
    
  updateStatus(status: string) {
    let statusParaEnviar: string;
    switch (status) {
      case 'Iniciar':
        statusParaEnviar = statusPartida.ANDAMENTO;
        break;
      case 'Finalizar':
        statusParaEnviar = statusPartida.FINALIDA;
        break;
      default:
        statusParaEnviar = this.partida.ds_status;
        break;
    }
    this.salaService.atualizarStatus(this.cdPartida, statusParaEnviar).subscribe(() => {
      this.openSnackBar(`Status da partida: ${status}`);
      this.updateMatch();
      this.loadPartida(this.cdPartida);
    });
  }

  checkIsOwner(): void {
    const cdUsuario = usuario.getUsuario();
    const owner = this.partida.jogadores.filter(jogador => jogador.donoPartida);
    if (owner?.length) {
      this.isOwner = owner[0].cd_usuario === Number(cdUsuario);
    }
  }

  checkCanInit(): boolean {
    return this.isOwner && this.partida.ds_status === statusPartida.ABERTA && this.partida.limiteUsuarios === this.partida.usuariosNaPartida;
  }

  checkCanClose(): boolean {
    return this.isOwner && this.partida.ds_status === statusPartida.ANDAMENTO;
  }

  openSnackBar(message: string, action = null) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  openVote() {
    const dialogRef = this.dialog.open(VoteComponent, {
      height: '400px',
      width: '90vw',
      data: { jogadores: this.partida.jogadores }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  exitMatch() {
    const cdUsuario = usuario.getUsuario()
    this.socket.emit(events.LEFT_MATCH, {
      cdPartida: this.cdPartida,
      cdUsuario: cdUsuario,
    });
  }

  closeMatch() {
    const cdUsuario = usuario.getUsuario();
    this.socket.emit(events.CLOSE_MATCH, {
      cdPartida: this.cdPartida,
      cdUsuario: cdUsuario,
    });
  }

  updateMatch() {
    const cdUsuario = usuario.getUsuario();
    this.socket.emit(events.UPDATE_MATCH, {
      cdPartida: this.cdPartida,
      cdUsuario: cdUsuario,
    });
  }
}
