import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-minimapa',
  templateUrl: './minimapa.component.html',
  styleUrls: ['./minimapa.component.css']
})
export class MinimapaComponent implements AfterViewInit {

  @Input('coordenadas') lngLat: [number,number] = [0,0];
  @ViewChild('mapa') divMapa!: ElementRef;
  constructor() { }
  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive:false
    });

    new mapboxgl.Marker()
        .setLngLat(this.lngLat)
        .addTo(mapa)
  }



}
