import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CartDatasourceItem, CartItem } from './domain/cartItem';
import { Product } from './domain/product';
import { OrderDto } from './dto/order';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isLoaded = false;

  private cartItems: CartItem[] = [];

  private _datasource: CartDatasourceItem[] = [];

  get currentDatasource() {
    return this._datasource;
  }

  constructor(
    private modelService: ModelService
  ) { }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private load() {
    if (!this.isLoaded) {
      let stored = localStorage.getItem('cart');
      if (stored) {
        this.cartItems = JSON.parse(stored);
      }
      this.isLoaded = true;
    }
  }

  addToCart(product: Product): boolean {
    let found = this.cartItems.findIndex(item => item.product.idProduct == product.idProduct) != -1;
    if (!found) {
      this.cartItems.push(new CartItem(product, 1));
      this.save();
    }
    return !found;
  }

  delete(index: number) {
    this.load();
    this.cartItems.splice(index, 1);
    this.save();
  }

  clear() {
    this.load();
    this.cartItems = [];
    //this._datasource = [];
    this.save();
  }

  updatePrices(order: OrderDto) {
    this._datasource.forEach(dsItem => {
      let orderItem = order.items.find(item => item.idProduct == dsItem.idProduct);
      if (orderItem?.price) {
        dsItem.price = orderItem.price;
      }
    });
  }

  getCartItemCount(): number {
    this.load();
    return this.cartItems.length;
  }

  getCartItems(): CartItem[] {
    this.load();
    return this.cartItems;
  }

  isEmpty(): boolean {
    return this.cartItems.length == 0;
  }

  updateQty(index: number, qty: number) {
    this.load();
    this.cartItems[index].qty = qty;
    this.save();
  }

  getDataSource(): Observable<CartDatasourceItem[]> {
    this.load();
    let cartDSItems: CartDatasourceItem[] = [];

    let uniqueIds = new Set<number>();
    this.cartItems.forEach(item => uniqueIds.add(item.product.idModel));
    let ids: number[] = Array.from(uniqueIds);

    this.modelService.getModelsByIds(ids).subscribe(
      modelDtos => {
        this.cartItems.forEach(cartItem => {
          let modelDtoIndex = modelDtos.findIndex(item => item.id == cartItem.product.idModel);
          if (modelDtoIndex != -1) {
            let cartDSItem = new CartDatasourceItem(cartItem, modelDtos[modelDtoIndex]);
            cartDSItems.push(cartDSItem);

          }
        })
      }
    );
    this._datasource = cartDSItems;
    return of(cartDSItems);
  }

  getTotalCost(): number {
    return this._datasource.reduce((sum, current) => sum + current.price * current.qty, 0);
  }

  getProductLabelById(id: number): string {
    let product = this._datasource.find(item => item.idProduct == id);
    if (product) {
      return product.model;
    } else {
      return '';
    }
  }
 
}
