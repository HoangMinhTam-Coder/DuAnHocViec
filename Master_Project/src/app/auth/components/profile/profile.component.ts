import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  menuType: string = '';
  sellerName: string = '';
  userName: string = '';
  userEmail:string = '';
  userPassword:string = '';

  constructor(private route: Router) {}

  ngOnInit() {
    if (localStorage.getItem('admin')) {
      let sellerStore = localStorage.getItem('admin');
      let sellerData = sellerStore && JSON.parse(sellerStore)[0];
      this.sellerName = sellerData.name;
      this.menuType = 'seller';
    } else if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userName = userData.name;
      this.userEmail = userData.email;
      this.userPassword = userData.password;
      this.menuType = 'user';
    }
  }

  userLogout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.menuType = 'default';
      this.route.navigate(['/login']);
    }
  }
}
