import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import * as d3 from 'd3';
import { cluster } from 'd3';
import "color-legend-element";

import 'leaflet.markercluster';

import { MarkerClusterGroup } from "leaflet";
// import {MarkerClusterGroup} from "leaflet.markercluster";

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { ColorLegendElement } from 'color-legend-element';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})



export class MapComponent implements OnInit {
  private map!: L.Map;
  private amenitiesLayer: L.LayerGroup<any> = L.layerGroup();
  public layerGroup = new L.LayerGroup();
  public layerGroupP = new L.LayerGroup();
  public markerC = L.markerClusterGroup({
    iconCreateFunction: function(cluster){
      var childMarkers = cluster.getAllChildMarkers();
      var colors = {"#1E8445":0,'#41d97b':0,'#ede657':0,'#f55433':0 };

    for (var i=0; i< childMarkers.length;i++){
          colors[String(childMarkers[i].options.color)] +=1;

      }
      console.log(colors);
      var  max = Object.keys(colors).reduce((a, b) => colors[a] > colors[b] ? a : b);
      console.log(max);
      var count = childMarkers.length;
      return  new L.DivIcon({ iconSize: new L.Point(40, 40), html: '<div ><span >' + count})
      
    }
  });

/**
**/

  private _amenities: {
    name: string;
    id: string;
    latitude: number;
    longitude: number;
    children_kiga_age: number;
    occupancy_rate: number;
  }[] = [];

    get amenities(): {name: string; id: string; latitude: number; longitude: number; children_kiga_age: number; occupancy_rate: number;}[] {
    return this._amenities;
  }

  @Input()
    set amenities(
    value: {name: string; id:string; latitude: number; longitude: number; children_kiga_age: number; occupancy_rate: number;}[]
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
      .bindPopup('<b>' + 'Name: ' + '</b>' + a.name  + '<br>' + '<b>' + "id:" + '</b>'+ a.id +'<br>' + '<b>' + "Children within 5km: " + '</b>' + a.children_kiga_age + '<br>' + '<b>' + 'Occupancy rate: ' +'</b>' + a.occupancy_rate )
    );

    
    // create a new layer group and add it to the map
    //this.amenitiesLayer = L.layerGroup(markers);
   // markers.forEach((m) => m.addTo(this.amenitiesLayer));
    markers.forEach((m)=> this.markerC.addLayer(m) )
    this.map.addLayer(this.markerC)
    //this.map.addLayer(this.amenitiesLayer);

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
        //colorMarker = "#6FCB9F";
        colorMarker = '#1E8445';
      }
      // slightly overcrowded kindergartens
      else if (occupancy_rate > 1 && occupancy_rate < 1.2) {
        //colorMarker = "#FFFEB3";
        colorMarker = '#41d97b';
      }

      // medium overcrowded kindergartens
      else if (occupancy_rate > 1.2 && occupancy_rate < 2) {
        //colorMarker = "#FE9076";
        colorMarker = '#ede657';
      }

      // strongly overcrowded kindergartens
      else {
        //colorMarker = "#FB2E01";
        colorMarker = "#f55433";
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
  ;



  

  /**
   * Code for Index Coropleth Map
   * 
   * Add a GeoJSON FeatureCollection to this map
   * @param latitude
   */
  
  public addGeoJSON(geojson: FeatureCollection): void {
    if(this.layerGroup.getLayers.length==0) {
      // popup for each cell
      const onEachFeature = (feature: Feature<Geometry, any>, layer: L.Layer) => {
        if (
          feature.properties &&
          typeof feature.properties.index !== 'undefined'
        ) {
          layer.bindPopup('<b>' + "Index: " + '</b>' + feature.properties.index + '<br>' + '<b>'   +"nr_children: " + '</b>'  +feature.properties.nr_children_kiga_age
          + '<br>' + '<b>'  + "Kindergartens in reach: " + '</b>' +feature.properties.nr_kinga_in_reach + '<br>' + '<b>'  + "id:"+ '</b>'  +feature.id )

          ;
        }
      };



      // each feature has a custom color
      const style = (feature: Feature<Geometry, any> | undefined) => {
        const index = feature?.properties?.index;
        var color = ""
        // the color scale
        switch(index){
          case 0:
            color = '#FFFFFF'
            break;
          case 1: 
            //color = '#FF0D0D'
            color = '#ba0707'
            break;
          case 2:
            //color = '#FF4E11'
            color = '#f55433'
            break;
          case 3:
            //color = '#FF8E15'
            color = '#ede657'
            break;
          case 4:
            //color = '#ACB334'
            color = '#41d97b'
            break;
          case 5:
            //color = '#69B34C'
            color = '#1E8445'
            break;
          case 6:
            color = '#69B34C'
            break;
          
        }
        
        return {
          fillColor: color,
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
        };
      };

      const geoJSON = L.geoJSON(geojson, {
        onEachFeature,
        style,
      });
      this.layerGroup.addLayer(geoJSON);
    }
    this.layerGroup.addTo(this.map)
  }

  // the function to remove the layer
  public removeIndex(){
    this.map.removeLayer(this.layerGroup);
  }


    /**
   * Code for Index Population Map
   * 
   * Add a GeoJSON FeatureCollection to this map
   * @param latitude
   */
  
  public addPupulation(geojson: FeatureCollection): void {
    if(this.layerGroupP.getLayers.length==0) {
      // popup for each cell
      const onEachFeature = (feature: Feature<Geometry, any>, layer: L.Layer) => {
        if (
          feature.properties &&
          typeof feature.properties.index !== 'undefined'
        ) {
          layer.bindPopup('<b>' + "Index: " + '</b>' + feature.properties.index + '<br>' + '<b>'   +"nr_children: " + '</b>'  +feature.properties.children
          + '<br>' + '<b>'  + "Total Population: " + '</b>' +feature.properties.population + '<br>' + '<b>'  + "id:"+ '</b>'  +feature.id)

          ;
        }
      };
      const colorscale = d3.scaleLinear().domain([0, 23383]).range([0,100]);
      var colorlegend = new ColorLegendElement();
      colorlegend.titleText = "Population";
      colorlegend.domain = [0,23383];

    



      // each feature has a custom color
      const style = (feature: Feature<Geometry, any> | undefined) => {
        const pop = feature?.properties?.population;
        const color = d3.interpolateGreens(colorscale(pop));

    
        
        return {
          fillColor: color,
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
        };
      };

      const geoJSON = L.geoJSON(geojson, {
        onEachFeature,
        style,
      });
      this.layerGroupP.addLayer(geoJSON);
    }
    this.layerGroupP.addTo(this.map)
  }
  

  // the function to remove the layer
  public removeIndexP(){
    this.map.removeLayer(this.layerGroupP);
  }

  

}
 






