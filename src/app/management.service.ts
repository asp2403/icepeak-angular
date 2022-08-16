import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from './dto/order';
import { OrderSearchDto } from './dto/order-search';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private url = '/api/management/';

  constructor(
    private http: HttpClient
  ) { }

  searchOrders(params: HttpParams): Observable<OrderSearchDto> {
    return this.http.get<OrderSearchDto>(this.url + 'orders/search/', {params: params});
  }
}
