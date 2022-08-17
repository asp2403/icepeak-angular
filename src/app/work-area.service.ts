import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BpmData } from './dto/bpm';
import { OrderDto } from './dto/order';
import { OrderSearchDto } from './dto/order-search';

@Injectable({
  providedIn: 'root'
})
export class WorkAreaService {

  private url = '/api/work-area/';

  constructor(
    private http: HttpClient
  ) { }

  searchOrders(params: HttpParams): Observable<OrderSearchDto> {
    return this.http.get<OrderSearchDto>(this.url + 'orders/search/', {params: params});
  }

  getOrder(id: number): Observable<OrderDto> {
    return this.http.get<OrderDto>(this.url + 'orders/' + id);
  }

  getActions(state: number): Observable<BpmData> {
    return this.http.get<BpmData>(this.url + 'bpm/actions/' + state);
  }

  assignOrder(idOrder: number, idManager: number): Observable<OrderDto>{
    return this.http.put<OrderDto>(this.url + `orders/${idOrder}/assign/${idManager}`, null);
  }
}
