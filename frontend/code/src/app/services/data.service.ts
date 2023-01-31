import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureCollection } from 'geojson';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Get Pubs from Backend
   */
  public getPubs(): Observable<
    { name: string; latitude: number; longitude: number; children_kiga_age: number; occupancy_rate: number}[]
  > {
    const url = 'http://localhost:5000/pubs';
    return this.http.post<
      { name: string; latitude: number; longitude: number; children_kiga_age: number; occupancy_rate: number; }[]
    >(url, {}, httpOptions);
  }

  /**
   * Get Cells
   */
   public getchoropleth(): Observable<FeatureCollection> {
    const url = 'http://localhost:5000/choropleth';
    return this.http.post<FeatureCollection>(url, {}, httpOptions);
  }
}
