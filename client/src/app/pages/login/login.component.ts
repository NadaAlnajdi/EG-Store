import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorMsg: string = '';
  userData: Login = {
    email: '',
    password: '',
  };
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    let token = localStorage.getItem('token');
    if (token) this.router.navigate(['']);
  }

  get userEmail() {
    return this.loginForm.get('email');
  }
  get UserData() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {}

  handleLogin(form: NgForm) {
    if (form.valid) {
      this.auth.login(this.userData).subscribe(
        (res) => {
          if (res.apiStatus) {
            this.toastr.success('Hello world!', 'Toastr fun!');
            this.router.navigateByUrl('');
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('token', res.data.token);
            if (res.data.role === 'Admin') {
              this.auth.adminFlag.next(true)
            }
            this.auth.loginFlag.next(true)
            this.auth.name = res.data.name
            this.auth.email = res.data.email
            this.auth.id = res.data._id
          }
        },
        (err) => {
          console.log(err.error.message);
          this.errorMsg = err.error.message;
        }
      );
    }
  }
}
