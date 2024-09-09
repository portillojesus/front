import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent {
  providerForm: FormGroup;
  providers: Array<{ id: number, name: string }> = [];

  constructor(private fb: FormBuilder) {
    this.providerForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {  // Ensure localStorage is available
      const savedProviders = localStorage.getItem('providers');
      if (savedProviders) {
        this.providers = JSON.parse(savedProviders);
      }
    }
  }
  editMode: boolean = false;
  selectedProviderId: number | null = null;

  onEdit(provider: { id: number, name: string }): void {
    this.editMode = true;
    this.selectedProviderId = provider.id;
    this.providerForm.patchValue({
      name: provider.name
    });
  }

  onSubmit(): void {
    if (this.providerForm.valid) {
      if (this.editMode) {
        // Edit the existing provider
        const index = this.providers.findIndex(p => p.id === this.selectedProviderId);
        if (index !== -1) {
          this.providers[index].name = this.providerForm.value.name;
          localStorage.setItem('providers', JSON.stringify(this.providers));  // Save updated data
          this.editMode = false;
          this.selectedProviderId = null;
        }
      } else {
        // Add new provider
        const newProvider = { id: this.providers.length + 1, name: this.providerForm.value.name };
        this.providers.push(newProvider);
        localStorage.setItem('providers', JSON.stringify(this.providers));  // Save to local storage
      }
      this.providerForm.reset();
    }
  }

  deleteProvider(id: number): void {
    this.providers = this.providers.filter(provider => provider.id !== id);
    localStorage.setItem('providers', JSON.stringify(this.providers));  // Update local storage
  }
}
