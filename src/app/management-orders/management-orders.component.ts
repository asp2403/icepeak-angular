import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OrderState } from '../domain/order-state';
import { OrderDto } from '../dto/order';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-management-orders',
  templateUrl: './management-orders.component.html',
  styleUrls: ['./management-orders.component.css']
})
export class ManagementOrdersComponent implements OnInit {

  total = 0;

  pageNumber = 0;

  orders: OrderDto[] = [];

  displayedColumns = ['idOrder', 'state', 'orderDate', 'contactName', 'contactSurname', 'contactEmail', 'contactPhone'];

  states = [
    {id: OrderState.NEW, state: this.getStateLabel(OrderState.NEW)},
    {id: OrderState.PROCESSING, state: this.getStateLabel(OrderState.PROCESSING)},
    {id: OrderState.READY, state: this.getStateLabel(OrderState.READY)},
    {id: OrderState.DELIVERED, state: this.getStateLabel(OrderState.DELIVERED)},
    {id: OrderState.CANCELLED, state: this.getStateLabel(OrderState.CANCELLED)},
  ]

  selectedState: string = '';

  private params = new HttpParams().set('page', 0).set('size', 20);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private managementService: ManagementService
  ) { }

  ngOnInit(): void {
    this.params = this.params.set('sort', 'state');
    this.search();
  }

  private search(): void {
    this.managementService.searchOrders(this.params).subscribe(result => {
      this.orders = result.content;
      this.total = result.totalElements;
      this.pageNumber = result.number;
    });
  }

  onPageEvent(event: PageEvent) {
    this.params = this.params.set('page', event.pageIndex);
    this.search();
  }

  getStateLabel(state: number): string {
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

  // getDateTime(Timestamp)

  filter(paramName: string, paramValue: string) {
    if (paramValue) {
      this.params = this.params.set(paramName, paramValue);
    } else {
      this.params = this.params.delete(paramName);
    }
    this.resetPaginator();
    this.search();
  }

  private resetPaginator(): void {
    this.paginator.firstPage();
  }

}
