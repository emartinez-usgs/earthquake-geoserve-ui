import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../environments/environment';


@Injectable()
export class PlacesService {

  public readonly PLACES_URL = environment.apiUrl + 'places.json';

  private _places: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public readonly places: Observable<any> = this._places.asObservable();


  constructor (private http: HttpClient) {}

  empty (): void {
    this._places.next(null);
  }

  getPlaces (latitude: number, longitude: number): void {
    const url = this.buildUrl(latitude, longitude);

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getPlaces', {event: {features: []}}))
    ).subscribe((response) => {
      this._places.next(response.event.features);
    });
  }


  private handleError<T> (action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  buildUrl (latitude: number, longitude: number): string {
    // normalize longitude for search
    while (longitude <= -180) {
      longitude += 360;
    }
    while (longitude > 180) {
      longitude -= 360;
    }

    return this.PLACES_URL + '?' +
      `latitude=${latitude}` +
      `&longitude=${longitude}` +
      '&type=event';
  }
}
