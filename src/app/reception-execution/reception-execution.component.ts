import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reception-execution',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reception-execution.component.html',
  styleUrls: ['./reception-execution.component.css']
})
export class ReceptionExecutionComponent {
  receptionForm: FormGroup;
  turnos: Array<{
    id: number;
    provider: string;
    cage: string;
    startTime: string;
    products: { name: string; quantity: number }[];
    receptionStart?: string;  // Optional properties to store reception start/end times
    receptionEnd?: string;
  }> = [
    { id: 1, provider: 'Provider 1', cage: 'Cage 1', startTime: '08:00', products: [{ name: 'Product 1', quantity: 10 }] },
    { id: 2, provider: 'Provider 2', cage: 'Cage 2', startTime: '09:00', products: [{ name: 'Product 2', quantity: 5 }] }
  ];

  constructor(private fb: FormBuilder) {
    this.receptionForm = this.fb.group({
      cage: [''],
      receptionStart: [''],
      receptionEnd: ['']
    });
  }

  startReception(turno: { receptionStart?: string }): void {
    turno.receptionStart = new Date().toLocaleTimeString();
  }

  endReception(turno: { receptionEnd?: string }): void {
    turno.receptionEnd = new Date().toLocaleTimeString();
  }
}
