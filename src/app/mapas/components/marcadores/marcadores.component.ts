import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorYcolor {
  color: string;
  marcador: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number,number] = [-70.55695340172628,-33.50701202375152];

  //Arreglo de marcadores
  marcadores: MarcadorYcolor[] = [];

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container:  this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    
    const Marcador = new mapboxgl.Marker()
        .setLngLat( this.center )
        .addTo( this.mapa);
    
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      color,
      draggable: true
    })
                                      .setLngLat(this.center)
                                      .addTo(this.mapa);
    const Nuevo: MarcadorYcolor = {
      color: color,
      marcador: nuevoMarcador
    }
    this.marcadores.push(Nuevo);

    
  }

  irMarcador(posicion: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: [posicion.getLngLat().lng,posicion.getLngLat().lat]
    })
  }

  borrarMarcador(indice: number) {
    this.marcadores[indice].marcador?.remove();
    this.marcadores.splice(indice,1);
  }
  

}
