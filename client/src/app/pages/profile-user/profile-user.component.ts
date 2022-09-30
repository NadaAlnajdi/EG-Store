import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoaded = false;
  editMode=false
  user:any={}
  constructor(public auth: AuthService,
    private userService:UserService,
    private router:Router,
    private global:GlobalService
    ) {}

  ngOnInit(): void {
    this.getProfile()
  }

  userData:User={
    name:"",
    email:"",
    password:""
  }

  handleRegister(form:NgForm){
    if(form.valid){
     
    }
    }

  getProfile(){
    this.global.singleUser().subscribe(
      res=> {
        this.user = res.data
      },
      err=>console.log(err)
      )
  }
  delete(){
    this.userService.deleteProfile().subscribe(
      res=> {
        this.auth.loginFlag.next(false)
        this.router.navigateByUrl('login')
      },
      err=>console.log(err)
    )
  }
  edit(){
    this.editMode = true
  }

}
