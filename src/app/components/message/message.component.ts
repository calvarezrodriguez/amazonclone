import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  get message() {
    return this.dataService.message;
  }

  get messageType() {
    return this.dataService.messageType;
  }
}
