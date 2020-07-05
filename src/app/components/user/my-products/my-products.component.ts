import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent implements OnInit {
  products: any;

  constructor(
    private dataService: DataService,
    private restApi: RestApiService
  ) {}

  async ngOnInit() {
    try {
      const data = await this.restApi.get(
        environment.ApiEndpoint + environment.Products
      );
      data['success']
        ? (this.products = data['products'])
        : this.dataService.error(data['message']);
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }
}
