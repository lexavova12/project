import { Component, OnChanges, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {

  @Input() public address: string;

  public latitude: number = 0;
  public longitude: number = 0;
  public apiKey = 'AIzaSyB6Z3HlDiDGPL2IptxU7iRygR8l498aYU4';

   constructor(private http: HttpClient) {
   }

  public ngOnChanges(): any {
	this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=${this.apiKey}`)
		.subscribe((data: any) => {
		  if (!data.results[0].geometry) {
		    throw new Error('Something is going wrong');
		}
		this.latitude = data.results[0].geometry.location.lat;
		this.longitude = data.results[0].geometry.location.lng;
	});
  }
}
