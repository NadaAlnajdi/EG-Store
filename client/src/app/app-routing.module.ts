import { CartComponent } from './pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { productsComponent } from './pages/products/products.component';
import { SingleComponent } from './pages/single/single.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { ShowUserComponent } from './pages/admin/show-user/show-user.component';
import { ProfileComponent } from './pages/profile-user/profile-user.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'show-user', component: ShowUserComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'Products',
    children: [
      { path: '', component: productsComponent },
      { path: ':id', component: SingleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
