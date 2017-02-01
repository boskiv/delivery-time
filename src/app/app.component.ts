import { Component } from '@angular/core';
import {SamoService} from "./samo.service";
import {Store} from "./models/store";
import {runTest} from "tslint/lib/test";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public stores: Store[] = [];
  errorMessage: string;
  resultMessage: string;
  zip_code: number;

  constructor(private samoService: SamoService) {

  }
  ngOnInit() { this.getLocalStores(); }

  getDistance(zip_code){
    this.getUserState(zip_code)
    this.zip_code = zip_code;
    let closestStoreDistance = 0;
    for (let store of this.stores) {

      this.samoService.getDistance(store.zip_code, zip_code).subscribe(
        distance => {
          store.distance = distance
          store.deliveryTime = this.getDeliveryTime(distance)
          this.isClosest(store)
        },
        error => this.errorMessage = <any>error
      );
    }

  }

  getDeliveryTime(distance) {
    // 1 day if distance is <100 miles, 2 days if < 600 miles, 3-4 days < 2000 miles, else 4+ days.
    switch (true){
      case distance < 100:
        return '1 day';
      case distance > 100 && distance < 600:
        return '2 days';
      case distance > 600 && distance < 2000:
        return '3-4 days';
      case distance > 2000:
        return '4+ days';
      default:
        return 'Distance out of range'
    }

  }

  getLocalStores() {
    this.samoService.getLocalStores()
      .subscribe(
        stores => this.stores = stores,
        error => this.errorMessage = <any>error
        );
  }

  private getUserState(zip_code) {
    this.samoService.getUserState(zip_code).subscribe(state => this.resultMessage = state)
  }

  private isClosest(closetStore: Store) {
    for (let store of this.stores){
      if (closetStore.distance < store.distance) {
        closetStore.closest = true;
        store.closest = false;
      }
    }
  }
}
