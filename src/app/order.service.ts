import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderDto } from './dto/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = '/api/public/orders/';

  constructor(
    private http: HttpClient
  ) { }

  createOrder(order: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(this.url, order);
  }

 
}
