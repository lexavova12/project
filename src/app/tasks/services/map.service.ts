import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {
  public zoom = 12;
  public center: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
	mapTypeId: 'hybrid',
	zoomControl: false,
	scrollwheel: false,
	disableDoubleClickZoom: true,
	maxZoom: 15,
	minZoom: 8,
  };

  public ngOnInit() {
	navigator.geolocation.getCurrentPosition(position => {
		this.center = {
		lat: position.coords.latitude,
		lng: position.coords.longitude,
		};
	});
  }

  public zoomIn() {
	if (this.zoom < this.options.maxZoom) { this.zoom++; }
  }

  public zoomOut() {
	if (this.zoom > this.options.minZoom) { this.zoom--; }
  }
}
