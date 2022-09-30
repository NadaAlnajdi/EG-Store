import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  Url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.Url}products/getAllProducts`);
  }
  getsingle(id: any): Observable<any> {
    return this.http.get(`${this.Url}products/singleProduct/${id}`);
  }
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.Url}products/addProduct`, product);
  }
  editProduct( product: any , productId:any ): Observable<any> {
    return this.http.patch(`${this.Url}products/editProduct/${productId}`, product);
  }
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.Url}products/delProduct/${productId}`);
  }

  userImage(obj: any, id: any): Observable<any> {
    return this.http.patch(`${this.Url}products/uploadImage/${id}`, obj);
  }

  allUsers():Observable<any>{
    return this.http.get(`${this.Url}users/showAllUsers`)
  }

  singleUser():Observable<any>{
    return this.http.get(`${this.Url}users/showProfile`)
  }
  EditUser(id:any , obj :any):Observable<any>{
    return this.http.patch(`${this.Url}users/editProfile/${id}` , obj)
  }

  deleteUser(id:any):Observable<any>{
    return this.http.delete(`${this.Url}users/deleteProfile/${id}`)
  }
}
