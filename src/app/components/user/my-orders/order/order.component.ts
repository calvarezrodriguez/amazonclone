import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId: any;
  order: any;

  constructor(
    private restApi: RestApiService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.orderId = res['id'];
      this.getOrder();
    });
  }

  async getOrder(event?: any) {
    if (event) {
      this.order = null;
    }
    try {
      const data = await this.restApi.get(
        `${environment.ApiEndpoint}${environment.Orders}${this.orderId}`
      );
      data['success']
        ? (this.order = data['order'])
        : this.dataService.error(data['message']);
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }
}
