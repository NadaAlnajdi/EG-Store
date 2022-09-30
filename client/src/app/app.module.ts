import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { productsComponent } from './pages/products/products.component';
import { IndexComponent } from './pages/index/index.component';
import { SingleComponent } from './pages/single/single.component';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ShowUserComponent } from './pages/admin/show-user/show-user.component';
import { CartComponent } from './pages/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    SingleComponent,
    productsComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    EditProductComponent,
    ProfileComponent,
    ShowUserComponent,
    CartComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true 
  }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
