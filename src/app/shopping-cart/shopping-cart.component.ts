import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService, DSCartItem } from '../cart.service';
import { CartItem } from '../cart';
import { Location } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { OnQuantityChangeEvent } from '../quantity-spinner/quantity-spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['id', 'vendor', 'model', 'price', 'quantity', 'action'];
  footerColumns: string[] = ['id', 'quantity'];
  dataSource: DSCartItem[] = [];

  @ViewChild(MatTable) table!: MatTable<DSCartItem>;

  constructor(private cartService: CartService, private location: Location, public dialog: MatDialog) { }

  private updateDatasource(): void {
    this.dataSource = this.cartService.getDataSource();
  }

  ngOnInit(): void {
    this.updateDatasource();
  }

  getTotalCost(): number {
    // return this.cartService.getTotalCost();
  }

  goBack(): void {
    this.location.back();
  }

  clearCart(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: 'Вы действительно хотите очистить корзину?' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.clear();
        this.updateGrid();
      }
    });
  }

  onQuantityChange(value: OnQuantityChangeEvent) {
    this.cartService.updateQty(value.index, value.quantity);
    this.updateGrid();
  }

  private updateGrid(): void {
    this.updateDatasource();
    this.table.renderRows();
  }

  delItem(index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: 'Удалить товар из корзины?' } );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.delete(index);
        this.updateGrid();
      }
    });
  }

  cartIsEmpty(): boolean {
    return this.cartService.isEmpty();
  }

}
