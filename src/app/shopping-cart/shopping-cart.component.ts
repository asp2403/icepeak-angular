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
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['image', 'vendor', 'model', 'price', 'qty', 'action'];

  footerColumns: string[] = ['image', 'qty'];
  //dataSource = new ShoppingCartDS(this.cartService);

  dataSource: CartDatasourceItem[] = [];

  @ViewChild(MatTable) table!: MatTable<CartDatasourceItem>;

  constructor(
    private cartService: CartService,
    private location: Location,
    public dialog: MatDialog,
    private modelService: ModelService) { }

  ngAfterViewInit(): void {
    this.cartService.getDataSource().subscribe(ds => this.dataSource = ds);
  }

  // private getDataSet() {
  //   let cartDSItems: CartDatasourceItem[] = [];

  //   let cartItems = this.cartService.getCartItems();
  //   let uniqueIds = new Set<number>();
  //   cartItems.forEach(item => uniqueIds.add(item.product.idModel));
  //   let ids: number[] = Array.from(uniqueIds);

  //   this.modelService.getModelsByIds(ids).subscribe(
  //     modelDtos => {
  //         cartItems.forEach(cartItem => {
  //         let modelDtoIndex = modelDtos.findIndex(item => item.id == cartItem.product.idModel);
  //         if (modelDtoIndex != -1) {
  //           let cartDSItem = new CartDatasourceItem(cartItem, modelDtos[modelDtoIndex]);
  //           cartDSItems.push(cartDSItem);
  //         }
  //       });
  //       this.dataSource = cartDSItems;
  //     }
  //   );
  // }

  private updateDatasource(): void {
    //this.cartService.getDataSource().subscribe(ds => this.dataSource = ds);
  }

  ngOnInit(): void {
    //this.updateDatasource();


  }

  getTotalCost(): number {

    // return this.cartService.getTotalCost();
    return 0;
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: 'Удалить товар из корзины?' });
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
