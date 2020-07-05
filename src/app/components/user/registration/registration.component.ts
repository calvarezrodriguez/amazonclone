import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  password1: string = '';
  isSeller: boolean = false;

  btnDisable: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private restApi: RestApiService
  ) {}

  ngOnInit(): void {}

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.dataService.error('Las contraseñas no coinciden.');
            }
          } else {
            this.dataService.error(
              'No se ha ingresado la contraseña de confimación.'
            );
          }
        } else {
          this.dataService.error('No se ha ingresado una contraseña.');
        }
      } else {
        this.dataService.error('No se ha ingresado un correo electrónico.');
      }
    } else {
      this.dataService.error('No se ha ingresado un nombre');
    }
  }

  async register() {
    this.btnDisable = true;
    try {
      if (this.validate()) {
        const data = await this.restApi.post(
          environment.ApiEndpoint + environment.Singup,
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller,
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.dataService.getProfile();
          this.router
            .navigate(['profile/address'])
            .then(() => {
              this.dataService.success(
                'Registro Exitoso!. Por favor, ingrese a continuación sus Direcciones de Envío.'
              );
            })
            .catch((error) => this.dataService.error(error));
        } else {
          this.dataService.error(data['messsage']);
        }
      }
    } catch (error) {
      this.dataService.error(error['message']);
    }
    this.btnDisable = false;
  }
}
