import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(
    private dataService: DataService,
    private restApi: RestApiService
  ) {}

  async ngOnInit() {
    try {
      const data = await this.restApi.get(
        environment.ApiEndpoint + environment.Product
      );
      data['success'] ? this.products = data['products'] : this.dataService.error('No se pudo buscar productos.')
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }
}
