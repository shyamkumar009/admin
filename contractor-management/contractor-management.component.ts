import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Contractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  rating: number;
  status: 'active' | 'inactive';
  projectsCompleted: number;
  createdAt: Date;
}

@Component({
  selector: 'app-contractor-management',
  templateUrl: './contractor-management.component.html',
  styleUrls: ['./contractor-management.component.scss']
})
export class ContractorManagementComponent implements OnInit {
  contractors: Contractor[] = [];
  selectedContractor: Contractor | null = null;
  editForm: FormGroup;
  isEditing = false;
  specializations = ['kitchen', 'bathroom', 'livingRoom', 'bedroom', 'wholeHouse'];

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialization: [[], Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    // TODO: Fetch contractors from service
    this.loadMockContractors();
  }

  loadMockContractors() {
    this.contractors = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@contractor.com',
        phone: '123-456-7890',
        specialization: ['kitchen', 'bathroom'],
        rating: 4.5,
        status: 'active',
        projectsCompleted: 15,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@contractor.com',
        phone: '987-654-3210',
        specialization: ['livingRoom', 'bedroom'],
        rating: 4.8,
        status: 'active',
        projectsCompleted: 23,
        createdAt: new Date()
      }
    ];
  }

  editContractor(contractor: Contractor) {
    this.selectedContractor = contractor;
    this.isEditing = true;
    this.editForm.patchValue({
      name: contractor.name,
      email: contractor.email,
      phone: contractor.phone,
      specialization: contractor.specialization,
      status: contractor.status
    });
  }

  saveContractor() {
    if (this.editForm.valid && this.selectedContractor) {
      // TODO: Implement save functionality
      const updatedContractor = {
        ...this.selectedContractor,
        ...this.editForm.value
      };
      
      const index = this.contractors.findIndex(c => c.id === this.selectedContractor?.id);
      if (index !== -1) {
        this.contractors[index] = updatedContractor;
      }
      
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedContractor = null;
    this.editForm.reset();
  }

  deleteContractor(contractorId: string) {
    // TODO: Implement delete functionality
    this.contractors = this.contractors.filter(contractor => contractor.id !== contractorId);
  }

  getSpecializationLabel(specialization: string): string {
    return specialization.charAt(0).toUpperCase() + specialization.slice(1).replace(/([A-Z])/g, ' $1');
  }
} 