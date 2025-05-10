import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-estimate',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss']
})
export class EstimateComponent implements OnInit {
  estimateForm: FormGroup;
  chart: any;
  estimateDetails = {
    materials: 0,
    labor: 0,
    equipment: 0,
    permits: 0,
    total: 0
  };

  projectTypes = [
    { value: 'renovation', label: 'Home Renovation' },
    { value: 'construction', label: 'New Construction' },
    { value: 'remodeling', label: 'Remodeling' },
    { value: 'repair', label: 'Repair & Maintenance' }
  ];

  constructor(private fb: FormBuilder) {
    this.estimateForm = this.fb.group({
      projectType: ['', Validators.required],
      squareFootage: ['', [Validators.required, Validators.min(1)]],
      rooms: ['', [Validators.required, Validators.min(1)]],
      complexity: ['medium', Validators.required],
      timeline: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initializeChart();
    this.estimateForm.valueChanges.subscribe(() => {
      this.updateEstimate();
    });
  }

  initializeChart() {
    const ctx = document.getElementById('estimateChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Materials', 'Labor', 'Equipment', 'Permits'],
        datasets: [{
          data: [0, 0, 0, 0],
          backgroundColor: [
            '#3498db',
            '#2ecc71',
            '#e74c3c',
            '#f1c40f'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Cost Breakdown'
          }
        }
      }
    });
  }

  updateEstimate() {
    if (this.estimateForm.valid) {
      const formValue = this.estimateForm.value;
      const baseCost = this.calculateBaseCost(formValue);
      
      this.estimateDetails = {
        materials: baseCost * 0.4,
        labor: baseCost * 0.35,
        equipment: baseCost * 0.15,
        permits: baseCost * 0.1,
        total: baseCost
      };

      this.updateChart();
    }
  }

  calculateBaseCost(formValue: any): number {
    let baseCost = 0;
    const squareFootage = formValue.squareFootage;
    const rooms = formValue.rooms;
    const complexity = formValue.complexity;

    // Base cost per square foot
    switch (formValue.projectType) {
      case 'renovation':
        baseCost = squareFootage * 50;
        break;
      case 'construction':
        baseCost = squareFootage * 150;
        break;
      case 'remodeling':
        baseCost = squareFootage * 75;
        break;
      case 'repair':
        baseCost = squareFootage * 30;
        break;
    }

    // Adjust for complexity
    switch (complexity) {
      case 'low':
        baseCost *= 0.8;
        break;
      case 'high':
        baseCost *= 1.3;
        break;
    }

    // Adjust for number of rooms
    baseCost *= (1 + (rooms * 0.1));

    return Math.round(baseCost);
  }

  updateChart() {
    this.chart.data.datasets[0].data = [
      this.estimateDetails.materials,
      this.estimateDetails.labor,
      this.estimateDetails.equipment,
      this.estimateDetails.permits
    ];
    this.chart.update();
  }

  onSubmit() {
    if (this.estimateForm.valid) {
      // Here you would typically send the estimate to your backend
      console.log('Estimate submitted:', this.estimateDetails);
    }
  }
} 