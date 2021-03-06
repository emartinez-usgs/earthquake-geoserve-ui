import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { PlacesService } from '../places.service';

import { NearbyPlaceComponent } from '../nearby-place/nearby-place.component';
import { NearbyPlacesComponent } from './nearby-places.component';
import { NoDataComponent } from '../no-data/no-data.component';
import { NearbyPlaceListComponent } from '../nearby-place-list/nearby-place-list.component';

describe('NearbyPlacesComponent', () => {
  let component: NearbyPlacesComponent;
  let fixture: ComponentFixture<NearbyPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NearbyPlaceComponent,
        NearbyPlaceListComponent,
        NearbyPlacesComponent,
        NoDataComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: PlacesService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
