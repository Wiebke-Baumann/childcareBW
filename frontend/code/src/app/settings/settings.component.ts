import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {  

  // this output can be listened to in the parent component
  @Output()
  pubsAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  changePubs(show: boolean): void {
    this.pubsAdded.emit(show);
  }

  // location form stores and validates the inputs from our forms defined in the html document
  
  addPubs(): void {
    this.pubsAdded.emit(true);
  }

  // code for the Index
  @Output()
  indexAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  addIndex(show: boolean): void{
    this.indexAdded.emit(show);
  }
  

  // For the Sidenavigation
  @Output()
  isMenuOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSidenav(): void{
    this.isMenuOpen.emit(true);
  }

  
}

