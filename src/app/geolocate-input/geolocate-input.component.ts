import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-geolocate-input',
  templateUrl: './geolocate-input.component.html',
  styleUrls: ['./geolocate-input.component.css']
})
export class GeolocateInputComponent implements OnInit {
  public errorMessage: string;
  public geolocation: any;
  public showError: boolean;
  public showProgressBar: boolean;


  constructor(
    private coordinatesService: CoordinatesService,
    private dialogRef: MatDialogRef<GeolocateInputComponent>
  ) { }

  ngOnInit() {
    this.geolocateSuccess = this.geolocateSuccess.bind(this);
    this.showProgressBar = false;
    this.showError = false;
  }


  doGeolocate (): void {
    this.geolocation = this.getLocation();
    this.showProgressBar = true;
    this.showError = false;

    if (this.geolocation) {
      this.geolocation.getCurrentPosition(this.geolocateSuccess,
        this.geolocateError);
    } else {
      this.geolocateError({
        code: 0,
        message: 'Geolocation not supported'
      });
    }
  }

  geolocateError (error: any): void {
    this.errorMessage = error.message;
    this.showProgressBar = false;
    this.showError = true;
  }

  geolocateSuccess (position: any): void {
    let confidence,
        zoom;

    // get confidence
    confidence = this.coordinatesService.computeFromGeolocate(position);

    // get zoom
    zoom = this.coordinatesService.computeZoomFromConfidence(confidence);

    this.coordinatesService.setCoordinates({
      confidence: confidence,
      latitude: +position.coords.latitude,
      longitude: +position.coords.longitude,
      method: 'geolocate',
      zoom: zoom
    });
    this.dialogRef.close();
  }

  getLocation (): any {
    return navigator.geolocation;
  }
}
