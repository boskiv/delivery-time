import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Store} from "./models/store";

@Injectable()
export class SamoService {
  private storesUrl = 'assets/data/stores.json';
  private samoUrl = 'http://samo.org/op/zip';

  constructor(private http: Http) { }

  getLocalStores (): Observable<Store[]> {
    return this.http.get(this.storesUrl)
      .map(SamoService.extractStores)
      .catch(this.handleError);
  }


  private static extractStores(res: Response) {
    let body = res.json();
    return body.stores || [];
  }

  private extractDistance(res: Response, zipA, zipB) {
    let body = res.json();
    console.log(body[zipA+'-'+zipB].distance)
    return body[zipA+'-'+zipB].distance || 0;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getUserState(zipA){
    return this.http.get(`${this.samoUrl}/${zipA}`)
      .map( response => this.extractState(response, zipA))
      .catch(this.handleError);
  }

  getDistance(zipA, zipB) {
    return this.http.get(`${this.samoUrl}/${zipA}/${zipB}`)
      .map( response => this.extractDistance(response, zipA, zipB))
      .catch(this.handleError);
  }


  private extractState(res: Response, zipA: number) {
    let body = res.json();
    return `Your are from ${body[zipA].city}, ${body[zipA].state}` || 'Unknown';
  }
}
