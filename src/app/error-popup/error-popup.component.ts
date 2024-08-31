import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent {
  @Input() errorMessage: string = '';
  @Output() close = new EventEmitter();

  closePopup() {
    this.close.emit();
  }
}