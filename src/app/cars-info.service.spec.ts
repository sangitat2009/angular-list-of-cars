import { TestBed } from '@angular/core/testing';

import { CarsInfoService } from './cars-info.service';

describe('CarsInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarsInfoService = TestBed.get(CarsInfoService);
    expect(service).toBeTruthy();
  });
});
