import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, OnChanges {
  @Input() coordinates: number[];
  public color = '#3887be';
  public lngLat: mapboxgl.LngLat;
  constructor() {}
  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      'pk.eyJ1IjoiYWd0emRpbWkiLCJhIjoiY2pyaXc2OWN6MDV0cTQ0cXd1NHA0cHI1OSJ9.NQIQGDjleOWNi7bpSu_AGw'
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lngLat = new mapboxgl.LngLat(this.coordinates[0], this.coordinates[1]);
  }
}
