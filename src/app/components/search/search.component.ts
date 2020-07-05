import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query: String = '';
  page: number = 1;

  content: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private dataService: DataService,
    private restApi: RestApiService
  ) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe((res) => {
      this.query = res['query'];
      this.page = 1;
      this.getProducts();
    });
  }

  get lower() {
    return 1 + this.content.hitsPerPage * this.content.page;
  }

  get upper() {
    return Math.min(
      this.content.hitsPerPage * (this.content.page + 1),
      this.content.nbHits
    );
  }

  async getProducts() {
    this.content = null;
    try {
      const data = await this.restApi.get(
        `${environment.ApiEndpoint + environment.Search + this.query}&page=${
          this.page - 1
        }`
      );
      data['success']
        ? (this.content = data['content'])
        : this.dataService.error(data['message']);
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }
}
