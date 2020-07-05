import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email:string = '';
  password:string = '';
  btnDisable:boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private restApi: RestApiService
  ) {}

  ngOnInit(): void {}

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.dataService.error('No se ha ingresado una contraseña');
      }
    } else {
      this.dataService.error('No se ha ingresado un correo electrónico');
    }
  }

  async login() {
    this.btnDisable = true;
    try {
      if (this.validate()) {
        const data = await this.restApi.post(
          environment.ApiEndpoint + environment.Login,
          {
            email: this.email,
            password: this.password,
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.dataService.getProfile();
          this.router.navigate(['/']);
        } else {
          this.dataService.error(data['message']);
        }
      }
    } catch (error) {
      this.dataService.error(error['message']);
    }
    this.btnDisable = false;
  }
}
