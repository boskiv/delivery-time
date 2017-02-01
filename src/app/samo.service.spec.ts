/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SamoService } from './samo.service';

describe('SamoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SamoService]
    });
  });

  it('should ...', inject([SamoService], (service: SamoService) => {
    expect(service).toBeTruthy();
  }));
});
