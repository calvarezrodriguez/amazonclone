import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchProduct: string = '';
  // Mobile
  isCollapsed: boolean = true;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProfile();
    this.dataService.cartItems = this.dataService.getCart().length;
  }

  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.dataService.user = {};
    this.dataService.cartItems = 0;
    localStorage.clear();
    this.router.navigate(['']);
  }

  search() {
    if (this.searchProduct) {
      this.collapse();
      this.router.navigate(['search', { query: this.searchProduct }]);
    }
  }

  get user() {
    return this.dataService.user;
  }

  get cartItems() {
    return this.dataService.cartItems;
  }
}
