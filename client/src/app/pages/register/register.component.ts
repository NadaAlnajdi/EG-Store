import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import{NgForm} from "@angular/forms"
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData:User={
    name:"",
    email:"",
    password:""
  }
  constructor(private auth:AuthService , private router:Router) { }

  ngOnInit(): void {
  }
  handleRegister(form:NgForm){
    if(form.valid){
      this.auth.register(this.userData).subscribe(res=>{
        console.log(res)
        this.router.navigateByUrl("login")
      } , (err)=>{
        console.log(err)
      })
    }
    }
   
}
