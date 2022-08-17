import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorDto } from './dto/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private url = "/api/public/vendors/";

  constructor(private http: HttpClient) { }

  getVendors(): Observable<VendorDto[]> {
    return this.http.get<VendorDto[]>(this.url);
  }
}
