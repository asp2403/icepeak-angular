import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private location: Location,
    private authService: AuthService
  ) { }

  form: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get loginControl() {
    return this.form.controls['login'];
  }

  get passwordControl() {
    return this.form.controls['password'];
  }

  errorMsg: string = "";

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.form.valid) {
      let loginDto: LoginDto = {
        username: this.loginControl.value,
        password: this.passwordControl.value
      }
      this.authService.login(loginDto).subscribe({
        next: ud => {
          this.authService.userDetails = ud;
          this.goBack();
        },
        error: error => {
          if (error.status = 403) {
            this.errorMsg = 'Неправильное имя пользователя или пароль!'
          } else {
            console.error(error);
          }
        }
      });
    }
  }

}
