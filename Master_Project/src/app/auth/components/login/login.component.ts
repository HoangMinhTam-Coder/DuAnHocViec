import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { login } from 'src/app/model/data_type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isShowPass:boolean = false;
  pass:string =  'password';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public formBuilder: FormBuilder, private user: AuthService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get l() {
    return this.loginForm.controls;
  }

  onCheckedBoxChange(event:any) {
    if(event.target.checked) {
      this.isShowPass = true;
      this.pass = "text"
    } else {
      this.pass = "password"
      this.isShowPass = false;
    }
  }

  login(data: login) {
    this.user.userLogin(data);
  }
}
