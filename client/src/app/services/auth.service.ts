import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
url= "http://localhost:3000/"
public loginFlag: BehaviorSubject<boolean> = new BehaviorSubject(false);
public adminFlag: BehaviorSubject<boolean> = new BehaviorSubject(false);
name! :string; 
email! :string; 
id! :string; 

  constructor(private http:HttpClient) { }
  
  register (obj:any):Observable<any>{
    return this.http.post("http://localhost:3000/users/register",obj)
  }
  login (obj:any):Observable<any>{
    return this.http.post("http://localhost:3000/users/login",obj)
  }

}