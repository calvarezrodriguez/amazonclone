import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: any;
  myReview = {
    title: '',
    description: '',
    rating: 0,
  };
  btnDisabled = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private restApi: RestApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.restApi
        .get(`${environment.ApiEndpoint + environment.Product + res['id']}`)
        .then((data) => {
          data['success']
            ? (this.product = data['product'])
            : this.router.navigate(['/']);
        })
        .catch((error) => this.dataService.error(error['message']));
    });
  }

  async postReview() {
    this.btnDisabled = true;
    try {
      const data = await this.restApi.post(
        environment.ApiEndpoint + environment.Review,
        {
          productId: this.product._id,
          title: this.myReview.title,
          description: this.myReview.description,
          rating: this.myReview.rating,
        }
      );
      data['success']
        ? this.dataService.success(data['message'])
        : this.dataService.error(data['message']);
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }

  addToCart() {
    this.dataService.addToCart(this.product)
      ? this.dataService.success('Producto añadido exitosamente al carrito.')
      : this.dataService.error('El producto no se pudo añadir al carrito.');
  }
  
}
