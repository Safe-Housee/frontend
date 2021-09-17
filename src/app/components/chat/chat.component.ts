import { ApplicationRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { events } from 'src/app/enums/events';
import { usuario } from 'src/app/utils/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() cdPartida: number;
  @Input() isOwner: boolean;
  message: string = '';
  allMessage = [];
  cdUsuario = usuario.getUsuario();
  name = usuario.getNmUsuario();
  @Output() update = new EventEmitter<any>();

  constructor(private socket: Socket, private appRef: ApplicationRef) { 
  }

  ngOnInit(): void {
    this.initialEvents();
  }

  initialEvents() {
    this.allEvents();
    if (this.isOwner) {
      this.createMatch();
    } else {
      this.enterMatch();
    }
  }

  createMatch() {
    this.socket.emit(events.NEW_MATCH, {
      cdPartida: this.cdPartida,
      cdDonoPartida: this.cdUsuario,
      name: this.name
    });
    console.log('partida criada')
  }

  enterMatch() {
    this.socket.emit(events.ENTER_MATCH, {
      cdPartida: this.cdPartida,
      cdUsuario: this.cdUsuario,
      name: this.name
    });
    console.log('entrou na partida');
  }

  newMessage() {
    this.socket.emit(events.NEW_MESSAGE, {
      cdPartida: this.cdPartida,
      cdUsuario: this.cdUsuario,
      message: this.message,
      nmUsuario: this.name
    });
    this.appRef.tick();
    this.message = '';
  }

  enterSend(event) {
    if (event.keyCode === 13) {
      this.socket.emit(events.NEW_MESSAGE, {
        cdPartida: this.cdPartida,
        cdUsuario: this.cdUsuario,
        message: this.message,
        nmUsuario: this.name
      });
      this.message = '';
    }

  }

  allEvents() {
    this.socket.fromEvent<any>(events.USER_ALREADY_ON_MATCH).pipe((data: any) => {
      return data
    });

    this.socket.fromEvent<any>(events.NEW_MESSAGE).pipe((data: any) => {
      data.subscribe(res => {
        console.log(res)
        this.allMessage.push(res)
      });
      return data
    });

    this.socket.fromEvent<any>(events.UPDATE_MATCH).pipe((data: any) => {
      data.subscribe(() => {
        this.update.emit();
      })
      return data
    });
  }
  
}
