import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.Url}cart/myCart`);
  }

  addToCart(productId: string,product:any): Observable<any> {
    return this.http.post(`${this.Url}cart/addCartItem/${productId}`,{...product});
  }

  getProductFromCart(): Observable<any> {
    return this.http.get(`${this.Url}cart/myCart`);
  }

  removeProductFromCart(cartItemId: string): Observable<any> {
    return this.http.delete(`${this.Url}cart/removeCartItem/${cartItemId}`);
  }
  clearCart(): Observable<any> {
    return this.http.delete(`${this.Url}cart/clearCart`);
  }

  deleteProfile(): Observable<any> {
    return this.http.delete(`${this.Url}users/deleteProfile`);
  }
}
