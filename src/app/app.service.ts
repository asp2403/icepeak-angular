import { Injectable } from '@angular/core';
import { OrderState } from './domain/order-state';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getStateLabel(state: number | undefined): string {
    switch(state) {
      case OrderState.NEW:
        return 'Новый';
      case OrderState.PROCESSING:
        return 'Комплектуется';
      case OrderState.READY:
        return 'Готов к выдаче';
      case OrderState.DELIVERED:
        return 'Выполнен';
      case OrderState.CANCELLED:
        return 'Отменен';
      default:
        return '';
    }
  }

  getStateClass(state: number | undefined): string {
    switch(state) {
      case OrderState.NEW:
        return 'state-new';
      case OrderState.PROCESSING:
        return 'state-processing';
      case OrderState.READY:
        return 'state-ready';
      case OrderState.DELIVERED:
        return 'state-delivered';
      case OrderState.CANCELLED:
        return 'state-cancelled';
      default:
        return '';
    }
  }
}
