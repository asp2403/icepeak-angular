import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartDatasourceItem } from '../domain/cartItem';

@Component({
  selector: 'app-check-grid',
  templateUrl: './check-grid.component.html',
  styleUrls: ['./check-grid.component.css']
})
export class CheckGridComponent implements OnInit {

  displayedColumns: string[] = ['vendor', 'model', 'price', 'qty'];
  footerColumns: string[] = ['vendor', 'qty'];
  dataSource: CartDatasourceItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cartService.currentDatasource;
  }

  getTotalCost(): number {
    return this.cartService.getTotalCost();
  }


}
