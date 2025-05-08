import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'homeowner' | 'contractor' | 'admin';
  status: 'active' | 'inactive';
  createdAt: Date;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  editForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    // TODO: Fetch users from service
    this.loadMockUsers();
  }

  loadMockUsers() {
    this.users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'homeowner',
        status: 'active',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'contractor',
        status: 'active',
        createdAt: new Date()
      }
    ];
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.isEditing = true;
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
  }

  saveUser() {
    if (this.editForm.valid && this.selectedUser) {
      // TODO: Implement save functionality
      const updatedUser = {
        ...this.selectedUser,
        ...this.editForm.value
      };
      
      const index = this.users.findIndex(u => u.id === this.selectedUser?.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedUser = null;
    this.editForm.reset();
  }

  deleteUser(userId: string) {
    // TODO: Implement delete functionality
    this.users = this.users.filter(user => user.id !== userId);
  }
} 