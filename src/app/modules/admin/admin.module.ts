import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/users/user/user.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { CreditComponent } from './components/credits/credit/credit.component';
import { DepositComponent } from './components/credits/deposit/deposit.component';

@NgModule({
  declarations: [
    UserComponent,
    NewUserComponent,
    CreditComponent,
    DepositComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
