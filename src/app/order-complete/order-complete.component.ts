import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderDto } from '../dto/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

  order?: OrderDto;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.order = history.state.data;
    if (this.order) {
      this.cartService.updatePrices(this.order);
    }
  }

}
