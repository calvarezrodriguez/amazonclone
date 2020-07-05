import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  btnDisabled: boolean = false;
  handler: any;

  quantities = [];

  constructor(
    private dataService: DataService,
    private restApi: RestApiService,
    private router: Router
  ) {}

  trackByCartItems(index: number, item: any) {
    return item._id;
  }

  get cartItems() {
    return this.dataService.getCart();
  }

  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data, index) => {
      total += data['price'] * this.quantities[index];
    });
    return total;
  }

  removeProduct(index, product) {
    this.quantities.splice(index, 1);
    this.dataService.removeFromCart(product);
  }

  ngOnInit(): void {
    this.cartItems.forEach((data) => {
      this.quantities.push(1);
    });
    this.handler = StripeCheckout.configure({
      key: environment.StripeKey,
      image: '../../../../assets/logo.png',
      locale: 'auto',
      token: async (stripeToken) => {
        let products;
        products = [];
        this.cartItems.forEach((d, index) => {
          products.push({
            product: d['_id'],
            quantities: this.quantities[index],
          });
        });
        try {
          const data = await this.restApi.post(
            environment.ApiEndpoint + environment.Payment,
            {
              totalPrice: this.cartTotal,
              products,
              stripeToken,
            }
          );
          data['success']
            ? (this.dataService.clearCart(),
              this.dataService.success('Compra Exitosa!'))
            : this.dataService.error(data['message']);
        } catch (error) {
          this.dataService.error(error['message']);
        }
      },
    });
  }

  validate() {
    if (!this.quantities.every((data) => data > 0)) {
      this.dataService.warning('La cantidad no puede ser inferior a 1.');
    } else if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']).then(() => {
        this.dataService.warning(
          'Necesitas iniciar sesión para realizar una compra.'
        );
      });
    } else if (!this.dataService.user['address']) {
      this.router.navigate(['/profile/address']).then(() => {
        this.dataService.warning(
          'No hay una dirección de envío, ingrese sus datos.'
        );
      });
    } else {
      this.dataService.message = '';
      return true;
    }
  }

  checkout() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.handler.open({
          name: 'AmazonCL',
          description: 'Pago y Envío',
          amount: this.cartTotal * 100,
          closed: () => {
            this.btnDisabled = false;
          },
        });
      } else {
        this.btnDisabled = false;
      }
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }
}
