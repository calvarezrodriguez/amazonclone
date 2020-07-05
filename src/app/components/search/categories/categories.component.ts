import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any;
  newCategory = '';
  btnDisabled = false;

  constructor(
    private dataService: DataService,
    private restApi: RestApiService
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

  validate() {
    if (this.newCategory) {
      return true;
    } else {
      this.dataService.error('Debe ingresar una categoría');
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    if(this.validate()){
      try {
        const data = await this.restApi.post(
          environment.ApiEndpoint + environment.Categories,
          { category: this.newCategory }
        );
        data['success']
          ? this.dataService.success(data['message'])
          : this.dataService.error(data['message']);
      } catch (error) {
        this.dataService.error['message'];
      }
    }
    this.btnDisabled = false;
  }
}
