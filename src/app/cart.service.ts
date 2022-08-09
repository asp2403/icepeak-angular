import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from './domain/cartItem';
import { Product } from './domain/product';
import { CartItemDto } from './dto/cart-item';
import { ProductDto } from './dto/product';
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
    let stored = localStorage.getItem('cart');
    if (stored) {
      this.cartItems = JSON.parse(stored);
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
    if (!this.isLoaded) {
      this.load();
      this.isLoaded = true;
    }
    return this.cartItems.length;
  }

  isEmpty(): boolean {
    return this.cartItems.length == 0;
  }

  updateQty(index: number, qty: number) {
    this.cartItems[index].qty = qty;
  }

  // getDataSource(): Observable<CartItemDto[]> {
  //   if (!this.isLoaded) {
  //     this.load();
  //   }
  //   let ids: number[] = [];
  //   this.cartItems.forEach(item => ids.push(item.product.idModel));
  //   this.modelService.getModelsByIds(ids).subscribe(
  //     (models) => {
  //       let cartItems: CartItemDto[] = [];
  //       models.forEach(model => {

        
  //       });
  //       return of(cartItems);
  //     }
  //   );
  // }

  //getTotalCost
}
