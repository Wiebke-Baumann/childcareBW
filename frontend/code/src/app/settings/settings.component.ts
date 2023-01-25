import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  // this output can be listened to in the parent component
  

  // this output can be listened to in the parent component
  @Output()
  pubsAdded: EventEmitter<boolean> = new EventEmitter<boolean>();


  // location form stores and validates the inputs from our forms defined in the html document
  
  

  
  addPubs(): void {
    this.pubsAdded.emit(true);
  }
}
