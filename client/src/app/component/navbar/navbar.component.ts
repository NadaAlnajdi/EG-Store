import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin=false;
  isLogin=false
  constructor(public auth : AuthService , private router:Router) { 
    let role= localStorage.getItem('role')
    if(role)this.auth.loginFlag.next(true)
  }
  ngOnInit(): void {
    this.auth.adminFlag.subscribe(
      adminFlag=>this.isAdmin = adminFlag
    )
    this.auth.loginFlag.subscribe(
      loginFlag=>this.isLogin = loginFlag
    )
  }
  handleLogout(){
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    this.auth.loginFlag.next(false)
    this.router.navigateByUrl('login');
    
  }
}
