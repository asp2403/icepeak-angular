import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderDto } from '../dto/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit, OnDestroy {

  order?: OrderDto;

  constructor(
    private cartService: CartService
  ) { }
  ngOnDestroy(): void {
    this.cartService.currentDatasource = [];
  }


  ngOnInit(): void {
    this.order = history.state.data;
    if (this.order) {
      this.cartService.updatePrices(this.order);
    }
  }

}
