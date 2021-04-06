import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number,number] = [-70.55695340172628,-33.50701202375152];

  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('move', ()=>{});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container:  this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) =>{
      this.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoom', (ev) =>{
      if( this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    })

    this.mapa.on('move', (ev) =>{
      this.center = [this.mapa.getCenter().lng,this.mapa.getCenter().lat]
      //console.log(this.mapa.getCenter().lng,this.mapa.getCenter().lat);
    })
  }

  zoomOut() {
    this.mapa.zoomOut()
  }

  zoomIn() {
    this.mapa.zoomIn()
  }

  zoomCambio(valor: any){
    this.mapa.zoomTo(Number(valor));
  }

}
