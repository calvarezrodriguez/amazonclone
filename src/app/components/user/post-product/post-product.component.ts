import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss'],
})
export class PostProductComponent implements OnInit {
  product = {
    title: '',
    price: 0,
    categoryId: '',
    description: '',
    product_picture: null,
  };

  categories: any;
  btnDisabled: boolean = false;

  constructor(
    private dataService: DataService,
    private restApi: RestApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const data = await this.restApi.get(
        environment.ApiEndpoint + environment.Categories
      );
      data['success']
        ? (this.categories = data['categories'])
        : this.dataService.error(data['message']);
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }

  validate(product) {
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.product_picture) {
              return true;
            } else {
              this.dataService.error('Debe ingresar una imagen.');
            }
          } else {
            this.dataService.error('Debe ingresar una descripción.');
          }
        } else {
          this.dataService.error('Debe ingresar una categoría.');
        }
      } else {
        this.dataService.error('Debe ingresar un precio.');
      }
    } else {
      this.dataService.error('Debe ingresar un título.');
    }
  }

  fileChange(event: any) {
    this.product.product_picture = event.target.files[0];
  }

  async post() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === 'product_picture') {
              form.append(
                'product_picture',
                this.product.product_picture,
                this.product.product_picture.name
              );
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        const data = await this.restApi.post(
          environment.ApiEndpoint + environment.Products,
          form
        );
        data['success']
          ? this.router
              .navigate(['/profile/myproducts'])
              .then(() => this.dataService.success(data['message']))
              .catch((error) => this.dataService.error(error))
          : this.dataService.error(data['message']);
      }
    } catch (error) {
      this.dataService.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
