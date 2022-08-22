import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cart.service';
import { Location } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { OnQuantityChangeEvent } from '../quantity-spinner/quantity-spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CartDatasourceItem } from '../domain/cartItem';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['image', 'vendor', 'model', 'price', 'qty', 'action'];

  footerColumns: string[] = ['image', 'qty'];

  dataSource: CartDatasourceItem[] = [];

  @ViewChild(MatTable) table!: MatTable<CartDatasourceItem>;

  constructor(
    private cartService: CartService,
    private location: Location,
    public dialog: MatDialog,
    private modelService: ModelService) { }

  ngOnInit(): void {
    let cartItems = this.cartService.getCartItems();
    let uniqueIds = new Set<number>();
    cartItems.forEach(item => uniqueIds.add(item.product.idModel));
    let ids: number[] = Array.from(uniqueIds);
    let cartDSItems: CartDatasourceItem[] = [];
    this.modelService.getModelsByIds(ids).subscribe(modelDtos => {
      cartItems.forEach(cartItem => {
        let modelDtoIndex = modelDtos.findIndex(item => item.id == cartItem.product.idModel);
        if (modelDtoIndex != -1) {
          let cartDSItem = new CartDatasourceItem(cartItem, modelDtos[modelDtoIndex]);
          cartDSItems.push(cartDSItem);
        }
      });
      this.dataSource = cartDSItems;
      this.cartService.currentDatasource = this.dataSource;
    });

  }



  getTotalCost(): number {
    return this.cartService.getTotalCost();
  }

  goBack(): void {
    this.location.back();
  }

  clearCart(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: 'Вы действительно хотите очистить корзину?' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.clear();
        this.dataSource = [];
        this.updateGrid();
      }
    });
  }

  onQuantityChange(value: OnQuantityChangeEvent) {
    this.cartService.updateQty(value.index, value.quantity);
    this.dataSource[value.index].qty = value.quantity;
    this.updateGrid();
  }

  private updateGrid(): void {
    this.table.renderRows();
  }

  delItem(index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: 'Удалить товар из корзины?' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.delete(index);
        this.dataSource.splice(index, 1);
        this.updateGrid();
      }
    });
  }

  cartIsEmpty(): boolean {
    return this.cartService.isEmpty();
  }

}
