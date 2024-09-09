import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception-cages',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reception-cages.component.html',
  styleUrls: ['./reception-cages.component.css']
})
export class ReceptionCagesComponent {
  cageForm: FormGroup;
  cages: Array<{ id: number, name: string, inUse: string }> = [];
  editMode: boolean = false;
  selectedCageId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.cageForm = this.fb.group({
      name: ['', Validators.required],
      inUse: ['N', Validators.required]  // Default to 'N'
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const savedCages = localStorage.getItem('cages');
      if (savedCages) {
        this.cages = JSON.parse(savedCages);
      }
    }
  }

  onSubmit(): void {
    if (this.cageForm.valid) {
      if (this.editMode) {
        const index = this.cages.findIndex(c => c.id === this.selectedCageId);
        if (index !== -1) {
          this.cages[index].name = this.cageForm.value.name;
          this.cages[index].inUse = this.cageForm.value.inUse;
          localStorage.setItem('cages', JSON.stringify(this.cages));
          this.editMode = false;
          this.selectedCageId = null;
        }
      } else {
        const newCage = { id: this.cages.length + 1, name: this.cageForm.value.name, inUse: this.cageForm.value.inUse };
        this.cages.push(newCage);
        localStorage.setItem('cages', JSON.stringify(this.cages));
      }
      this.cageForm.reset();
    }
  }

  onEdit(cage: { id: number, name: string, inUse: string }): void {
    this.editMode = true;
    this.selectedCageId = cage.id;
    this.cageForm.patchValue({
      name: cage.name,
      inUse: cage.inUse
    });
  }

  deleteCage(id: number): void {
    this.cages = this.cages.filter(cage => cage.id !== id);
    localStorage.setItem('cages', JSON.stringify(this.cages));
  }
}
