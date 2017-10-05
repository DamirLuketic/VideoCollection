import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../shared/services/message.service";

@Component({
  selector: 'vc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public hasMessage: boolean = false;
  public messageText: string = null;

  constructor(
      private messageService: MessageService
  ) { }

  ngOnInit() {
    let message = this.messageService.message;
    if ( message != null ) {
        this.hasMessage = true;
        this.messageText = message;
        setTimeout(() => {
          this.messageService.message = null;
          this.hasMessage = false;
          this.messageText = null;
        }, 3200);
    }
  }

}
