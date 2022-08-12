import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderDto } from './dto/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = '/api/orders/';

  constructor(
    private http: HttpClient
  ) { }

  createOrder(order: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(this.url, order)
    .pipe(
      catchError(this.handleCreateOrderError)
    );
  }

  getOrder(id: number): Observable<OrderDto> {
    return this.http.get<OrderDto>(this.url + id);
  }

  private handleCreateOrderError(error: HttpErrorResponse): Observable<OrderDto> {
    console.error(error.error);
    if (error.status == 404) {
      //let errorBody = error.error;
    }
    return throwError(() => new Error('Error in book.service'));
  }
}
