import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { login } from 'src/app/model/data_type';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ad-login',
  templateUrl: './ad-login.component.html',
  styleUrls: ['./ad-login.component.css']
})
export class AdLoginComponent {
  isShowPass:boolean = false;
  pass:string =  'password';
  loginAdminForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(public formBuilder: FormBuilder, private admin:AdminService) {}

  ngOnInit() {
    this.loginAdminForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get la() {
    return this.loginAdminForm.controls;
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

  loginAdmin(data: login) {
    this.admin.adminLogin(data);
  }

}
