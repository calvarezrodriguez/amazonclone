import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//  Controla formularios
import { FormsModule } from '@angular/forms';
//  Administra inyecciones en servicios
import { HttpClientModule } from '@angular/common/http';
// Bootstrap en angular
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './components/message/message.component';
import { RestApiService } from './services/rest-api.service';
import { DataService } from './services/data.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { AddressComponent } from './components/user/address/address.component';
import { PostProductComponent } from './components/user/post-product/post-product.component';
import { HomeComponent } from './components/page/home/home.component';
import { HeaderComponent } from './components/page/header/header.component';
import { FooterComponent } from './components/page/footer/footer.component';
import { MyProductsComponent } from './components/user/my-products/my-products.component';
import { CategoryComponent } from './components/search/category/category.component';
import { CategoriesComponent } from './components/search/categories/categories.component';
import { ProductComponent } from './components/search/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/page/cart/cart.component';
import { MyOrdersComponent } from './components/user/my-orders/my-orders.component';
import { OrderComponent } from './components/user/my-orders/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    HomeComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    CategoriesComponent,
    PostProductComponent,
    MyProductsComponent,
    CategoryComponent,
    ProductComponent,
    SearchComponent,
    CartComponent,
    MyOrdersComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
