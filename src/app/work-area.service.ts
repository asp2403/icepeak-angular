import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BpmData } from './dto/bpm';
import { OrderDto, OrderFullDto, OrderTitleDto } from './dto/order';
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

  getOrder(id: number): Observable<OrderFullDto> {
    return this.http.get<OrderFullDto>(this.url + 'orders/' + id);
  }

  getActions(order: OrderTitleDto, idManager: number): Observable<BpmData> {
    return this.http.put<BpmData>(this.url + 'bpm/get-actions/' + idManager, order);
  }

  assignOrder(idOrder: number, idManager: number): Observable<OrderTitleDto>{
    return this.http.put<OrderTitleDto>(this.url + `bpm/order/${idOrder}/assign-manager/${idManager}`, null);
  }

  orderCompleteProcessing(idOrder: number): Observable<OrderTitleDto> {
    return this.http.put<OrderTitleDto>(this.url + `bpm/order/${idOrder}/complete-processing`, null);
  }

  orderReturnToProcessing(idOrder: number): Observable<OrderTitleDto> {
    return this.http.put<OrderTitleDto>(this.url + `bpm/order/${idOrder}/return-to-processing`, null);
  }

  orderCompleteDelivery(idOrder: number): Observable<OrderTitleDto> {
    return this.http.put<OrderTitleDto>(this.url + `bpm/order/${idOrder}/complete-delivery`, null);
  }

}
