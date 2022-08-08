import { Injectable } from '@angular/core';
import { CartItem } from './domain/cartItem';
import { Product } from './domain/product';
import { ProductDto } from './dto/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isLoaded = false;

  private cartItems: CartItem[] = [];
  
  constructor() { }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private load() {
    let stored = localStorage.getItem('cart');
    if (stored) {
      this.cartItems = JSON.parse(stored);
    }
  }

  addToCart(product: Product, qty: number) {
    this.cartItems.push(new CartItem(product, qty));
    this.save();
  }

  getCartItemCount(): number {
    if (!this.isLoaded) {
      this.load();
      this.isLoaded = true;
    }
    return this.cartItems.length;
  }
}
