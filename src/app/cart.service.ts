import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CartDatasourceItem, CartItem } from './domain/cartItem';
import { Product } from './domain/product';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isLoaded = false;

  private cartItems: CartItem[] = [];

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
    this.cartItems.splice(index, 1);
    this.save();
  }

  clear() {
    this.cartItems = [];
    this.save();
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
    this.cartItems[index].qty = qty;
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
    return of(cartDSItems);
  }

}
