import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './map/map.component';
import { DataService } from './services/data.service';
import {FeatureCollection} from 'geojson'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // There are two options to add markers to our map component
  // option 1: get the component and call add marker method directly
  @ViewChild(MapComponent) map!: MapComponent;

  // option 2: use @Input() in the child component
  amenities: { name: string; latitude: number; longitude: number; children_kiga_age: number; occupancy_rate: number;}[] = [];


  /*
   * Services or other dependencies are often imported via dependency injection.
   * See https://angular.io/guide/dependency-injection for more details.
   */
  constructor(private dataservice: DataService) {}

  


  /*
   * Retrieve pubs from backend and override the member variable.
   */
  onPubsAdded(show: boolean) {
    if (show) {
      this.dataservice.getPubs().subscribe((pubs) => {
        this.amenities = pubs;
      });
    } else {
      this.amenities = [];
    }
  }
   public isMenuOpen : boolean = false;

  public onSidenavClick(): void {
    this.isMenuOpen = !this.isMenuOpen;

  }
  

  onIndexAdded(show: boolean): void{
    if (show){
      this.dataservice.getIndex().subscribe((geojson: FeatureCollection) =>{
            this.map.addGeoJSON(geojson);
    });
    }
    else{
      this.map.removeIndex()
    }
    
    
  };
  

 



}
