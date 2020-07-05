import { Injectable, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestApiService } from './rest-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  message: string = '';
  messageType: string = 'danger';

  user: any;
  cartItems: number = 0;

  constructor(private router: Router, private restApi: RestApiService) {
    this.resetState();
  }

  ngOnInit(): void {}

  error(message) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message) {
    this.messageType = 'warning';
    this.message = message;
  }

  resetState() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  async getProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.restApi.get(
          environment.ApiEndpoint + environment.Profile
        );
        this.user = data['user'];
      }
    } catch (error) {
      this.error(error);
    }
  }

  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(item: String) {
    const cart: any = this.getCart();
    if (cart.find((data) => JSON.stringify(data) === JSON.stringify(item))) {
      return false;
    } else {
      cart.push(item);
      this.cartItems++;
      localStorage.setItem('cart', JSON.stringify(cart));
      return true;
    }
  }

  clearCart() {
    this.cartItems = 0;
    localStorage.setItem('cart', '[]');
  }

  removeFromCart(item: string) {
    let cart: any = this.getCart();
    if (cart.find((data) => JSON.stringify(data) === JSON.stringify(item))) {
      cart = cart.filter(
        (data) => JSON.stringify(data) !== JSON.stringify(item)
      );
      this.cartItems--;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}
