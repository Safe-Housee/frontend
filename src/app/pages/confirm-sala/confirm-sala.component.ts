import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SalasService } from 'src/app/services/salas/salas.service';
import { partida } from 'src/app/utils/storage';

@Component({
  selector: 'app-confirm-sala',
  templateUrl: './confirm-sala.component.html',
  styleUrls: ['./confirm-sala.component.css']
})
export class ConfirmSalaComponent implements OnInit {

  constructor(
    private partidaService: SalasService,         
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<ConfirmSalaComponent>,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  async entrarPartida() {
    try {
      await this.partidaService.entrarPartida(this.data.cdPartida, this.data.cdUsuario).pipe().toPromise();
      this.route.navigate([`/salasdeespera/${this.data.cdPartida}`]);
      partida.setPartida(this.data.cdPartida);
      this.close();
    } catch(error) {
      console.error(error)
    }

  }

  close() {
    this.dialog.close();
  }
}
