import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { login, signUp } from '../model/data_type';
import { GetCartInit } from '../state/cart.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private store: Store) {}
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);

  // Config login service
  userLogin(data: login) {
    this.http
      .post(`https://localhost:7296/api/User/login?email=${data.email}&password=${data.password}`, data)
      .subscribe((result) => {
        var user = JSON.parse(JSON.stringify(result));

        if (user.user.role == 'User' || user.status == 200) {
          var user = JSON.parse(JSON.stringify(result));
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('token', JSON.stringify(user.tokens));
          localStorage.setItem('role', JSON.stringify(user.user.role));
          Swal.fire(
            'Good job!',
            `${user.message}`,
            'success'
          )
          this.store.dispatch(GetCartInit({id: user.user.id}))
          this.router.navigate(['/']);
          this.isSellerLoggedIn.next(true);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Error...',
            text: 'fewfwe',
          })
        }
      });
  }

  userSignUp(user: signUp) {
    this.http
      .post('https://localhost:7296/api/User/AddUser', user, { observe: 'response' })
      .subscribe((result) => {
        // Data
        var userk = JSON.parse(JSON.stringify(result.body));
        var userGet = JSON.stringify(userk.user);

        // Role User
        var role = JSON.stringify(userk.user.role)

        // Message Backend
        var message = JSON.stringify(userk.message);
        console.log(message);
        console.log(userGet);
        // ko ăn
        console.log(result);

        if (result.status == 200) {
          localStorage.setItem('user', JSON.stringify(userk.user));
          Swal.fire(
            'Good job!',
            message,
            'success'
          )
          this.router.navigate(['/login']);
        } else if(result.status == 400){
          Swal.fire({
            icon: 'error',
            title: 'Register Error...',
            text: "eOORR",
          })
          var usererror = JSON.parse(JSON.stringify(result.body));
          var messageerror = JSON.stringify(usererror.message);
        }
      });
  }
}
