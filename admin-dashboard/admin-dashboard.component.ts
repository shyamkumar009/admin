import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  navigateToUsers() {
    this.router.navigate(['/admin/users']);
  }

  navigateToContractors() {
    this.router.navigate(['/admin/contractors']);
  }

  logout() {
    // TODO: Implement logout functionality
    this.router.navigate(['/login']);
  }
} 