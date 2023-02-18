import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { MarkerClusterGroup } from "leaflet";
// import {MarkerClusterGroup} from "leaflet.markercluster";

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {
  private map!: L.Map;
  private amenitiesLayer: L.LayerGroup<any> = L.layerGroup();

  private _amenities: {
    name: string;
    latitude: number;
    longitude: number;
    children_kiga_age: number;
    occupancy_rate: number;
  }[] = [];

    get amenities(): {name: string; latitude: number; longitude: number; children_kiga_age: number; occupancy_rate: number;}[] {
    return this._amenities;
  }

  @Input()
    set amenities(
    value: {name: string; latitude: number; longitude: number; children_kiga_age: number; occupancy_rate: number;}[]
  ) {
    this._amenities = value;
    this.updateAmenitiesLayer();
  }

  private updateAmenitiesLayer() {
    if (!this.map) {
      return;
    }

    // remove old amenities
    this.map.removeLayer(this.amenitiesLayer);

    
    // create a marker for each supplied amenity
    const markers = this.amenities.map((a) =>
      L.circleMarker([a.latitude, a.longitude], {color: this.choseColors(a.occupancy_rate), fillOpacity: 1})
      .bindPopup('<b>' + 'Name: ' + '</b>' + a.name + '<br>' + '<b>' + "Children within 5km: " + '</b>' + a.children_kiga_age + '<br>' + '<b>' + 'Occupancy rate: ' +'</b>' + a.occupancy_rate )
    );

    
    // create a new layer group and add it to the map
    this.amenitiesLayer = L.layerGroup(markers);
    markers.forEach((m) => m.addTo(this.amenitiesLayer));
    this.map.addLayer(this.amenitiesLayer);

  }

  /**
 * Select the color for the marker according to the occupancy rate value
 * @param occupancy_rate
 *  
 */
  public choseColors(occupancy_rate: number) {
    let colorMarker = "";
      // kindergartens that are not overcrowded
      if (occupancy_rate < 1) {
        colorMarker = "#6FCB9F";
      }
      // slightly overcrowded kindergartens
      else if (occupancy_rate > 1 && occupancy_rate < 1.2) {
        colorMarker = "#FFFEB3";
      }

      // medium overcrowded kindergartens
      else if (occupancy_rate > 1.2 && occupancy_rate < 2) {
        colorMarker = "#FE9076";
      }

      // strongly overcrowded kindergartens
      else {
        colorMarker = "#FB2E01";
      }

      return colorMarker;
  }

  
  /**
   * Often divs and other HTML element are not available in the constructor. Thus we use onInit()
   */
  ngOnInit(): void {
 
    // basic setup, create a map in the div with the id "map"
    this.map = L.map('map').setView([47.66, 9.175], 13);

    // set a tilelayer, e.g. a world map in the background
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  // readonly cluster = L.markerClusterGroup();
  readonly cluster = new MarkerClusterGroup();

  /**
   * Add a marker at the specified position to the map.
   * @param latitude
   * @param longitude
   * @param name
   * @param children_kiga_age
   * @param occupancy_rate
   */

  public addMarker(latitude: number, longitude: number, children_kiga_age: number, occupancy_rate: number, name: string): void {
    const marker = this.cluster.addLayer(L.marker([latitude, longitude]).bindPopup(name + children_kiga_age + occupancy_rate));
    marker.addTo(this.map);
    this.map.addLayer(this.cluster)
  }

  }




