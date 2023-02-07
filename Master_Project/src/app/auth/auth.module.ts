import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressComponent } from './components/address/address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';

export const route: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'adrress',
    component: AddressComponent
  },
  {
    path: 'edit-adrress',
    component: EditAddressComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    AddressComponent,
    EditAddressComponent,
    HistoryComponent,
    HistoryDetailComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(route), FormsModule, ReactiveFormsModule],
  exports: [LoginComponent, SignupComponent, ProfileComponent, HistoryComponent],
})
export class AuthModule {}
