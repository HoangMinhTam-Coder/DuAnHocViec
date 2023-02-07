import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { signUp } from 'src/app/model/data_type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    Email: new FormControl(''),
    Name: new FormControl(''),
    Password: new FormControl(''),
    Address: new FormControl(''),
    Avt: new FormControl(''),
    SDT: new FormControl(''),
    Role: new FormControl('User')
  });

  constructor(public formBuilder: FormBuilder, private user: AuthService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      Password: ['', [Validators.required, Validators.minLength(2)]],
      Address: ['', [Validators.required]],
      Avt: ['', [Validators.required]],
      SDT: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Role: ['User']
    });
  }

  get l() {
    return this.signupForm.controls;
  }

  signUp(data: signUp): void {
    this.user.userSignUp(data);
  }
}
