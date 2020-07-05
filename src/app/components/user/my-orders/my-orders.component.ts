import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders : any;

  constructor(
    private restApi : RestApiService,
    private dataService : DataService
  ) { }

  async ngOnInit() {
    try{
      const data = await this.restApi.get(
        environment.ApiEndpoint+environment.Orders
      );
      data['success']
      ? ( this.orders = data['orders'] )
      : this.dataService.error(data['message']);
    }catch(error)
    {
      this.dataService.error(error['message']);
    }
  } 

}
