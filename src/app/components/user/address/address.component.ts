import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  btnDisabled: boolean = false;
  currentAddress: any;

  constructor(
    private dataService: DataService,
    private restApi: RestApiService
  ) {}

  async ngOnInit() {
    try {
      const data = await this.restApi.get(
        environment.ApiEndpoint + environment.Address
      );
      if (
        JSON.stringify(data['address']) === '{}' &&
        this.dataService.message === ''
      ) {
        this.dataService.warning(
          'No has ingresado ninguna dirección de envío. Por favor ingresa una dirreción.'
        );
      }
      this.currentAddress = data['address'];
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }
  validate(user) {
    if (user['addr1']) {
      if (user['city']) {
        if (user['state']) {
          if (user['postalCode']) {
            if (user['country']) {
              return true;
            } else {
              this.dataService.error('Debe ingresar su País.');
            }
          } else {
            this.dataService.error('Debe ingresar su Código postal.');
          }
        } else {
          this.dataService.error('Debe ingresar su Región.');
        }
      } else {
        this.dataService.error('Debe ingresar su Ciudad.');
      }
    } else {
      this.dataService.error('Debe ingresar al menos una dirección.');
    }
  }

  async updateAddress() {
    this.btnDisabled = true;
    try {
      if(this.validate(this.currentAddress)){
        const res = await this.restApi.post(
          environment.ApiEndpoint + environment.Address,
          {
            addr1: this.currentAddress['addr1'],
            addr2: this.currentAddress['addr2'] ? this.currentAddress['addr2'] : null ,
            city: this.currentAddress['city'],
            state: this.currentAddress['state'],
            postalCode: this.currentAddress['postalCode'],
            country: this.currentAddress['country'],
          }
        );
        res['success']
          ? (this.dataService.success(res['message']),
            await this.dataService.getProfile())
          : this.dataService.error(res['message']);
      }
    } catch (error) {
      this.dataService.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
