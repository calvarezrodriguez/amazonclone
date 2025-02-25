import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: any;
  category: any;
  page = 1;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private restApi: RestApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.categoryId = res['id'];
      this.getProducts();
    });
  }

  get lower() {
    return 10 * (this.page - 1) + 1;
  }

  get upper() {
    return Math.min(10 * this.page, this.category.totalProducts);
  }

  async getProducts(event?: any) {
    if (event) {
      this.category = null;
    }
    try {
      const data = await this.restApi.get(
        `${environment.ApiEndpoint + environment.Categories}${
          this.categoryId
        }?page=${this.page - 1}`
      );
      data['success']
        ? (this.category = data)
        : this.dataService.error(data['message']);
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }
}
