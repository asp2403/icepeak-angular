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

  set currentDatasource(value: CartDatasourceItem[]) {
    this._datasource = value;
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
