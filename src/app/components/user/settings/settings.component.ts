import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  btnDisable: boolean = false;
  currentSettings: any;

  constructor(
    private dataService: DataService,
    private restApi: RestApiService
  ) {}

  async ngOnInit() {
    try {
      if (!this.dataService.user) {
        await this.dataService.getProfile();
      }
      this.currentSettings = Object.assign(
        {
          newPassword: '',
          confirmNewPassword: '',
        },
        this.dataService.user
      );
    } catch (error) {
      this.dataService.error(error['message']);
    }
  }

  validate(settings) {
    if (settings['name']) {
      if (settings['email']) {
        if (settings['newPassword']) {
          if (settings['confirmNewPassword']) {
            if (settings['newPassword'] === settings['confirmNewPassword']) {
              return true;
            } else {
              this.dataService.error(
                'Las contraseñas no coinciden, intentelo nuevamente.'
              );
            }
          } else {
            this.dataService.error('Por favor, confirme la contraseña');
          }
        } else {
          if (!settings['confirmNewPassword']) {
            return true;
          } else {
            this.dataService.error('Por favor, ingrese una contraseña.');
          }
        }
      } else {
        this.dataService.error('Por favor, ingrese un correo.');
      }
    } else {
      this.dataService.error('Por favor, ingrese un nombre.');
    }
  }

  async update() {
    this.btnDisable = true;
    try {
      if (this.validate(this.currentSettings)) {
        const data = await this.restApi.post(
          environment.ApiEndpoint + environment.Profile,
          {
            name: this.currentSettings['name'],
            email: this.currentSettings['email'],
            password: this.currentSettings['newPassword'],
            isSeller: this.currentSettings['isSeller'],
          }
        );
        data['success']
          ? (this.dataService.getProfile(),
            this.dataService.success(data['message']))
          : this.dataService.error(data['message']);
      }
    } catch (error) {
      this.dataService.error(error['message']);
    }
    this.btnDisable = false;
  }
}
