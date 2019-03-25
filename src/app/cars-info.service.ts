import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsInfoService {

  constructor(private http: HttpClient) { }

  getCarInormationList() :any {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*', 
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',       
        'Content-Type':'text/html; charset=utf-8'
      })
    };
    return this.http.get('http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars',httpOptions );
}
}
