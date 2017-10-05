import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'vc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public popupSmall: boolean = false;

  @ViewChild('popup') popup: ElementRef;

  constructor(
      private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.renderer.addClass(this.popup.nativeElement, 'test');
  }

    toggleSmallPopup(){
    this.popupSmall = !this.popupSmall;
    }
}
