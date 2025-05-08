import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ContractorManagementComponent } from './contractor-management/contractor-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'users',
    component: UserManagementComponent
  },
  {
    path: 'contractors',
    component: ContractorManagementComponent
  }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserManagementComponent,
    ContractorManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { } 