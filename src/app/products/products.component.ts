import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productForm: FormGroup;
  products: Array<{ id: number, name: string }> = [];
  editMode: boolean = false;
  selectedProductId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        this.products = JSON.parse(savedProducts);
      }
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.editMode) {
        const index = this.products.findIndex(p => p.id === this.selectedProductId);
        if (index !== -1) {
          this.products[index].name = this.productForm.value.name;
          localStorage.setItem('products', JSON.stringify(this.products));
          this.editMode = false;
          this.selectedProductId = null;
        }
      } else {
        const newProduct = { id: this.products.length + 1, name: this.productForm.value.name };
        this.products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(this.products));
      }
      this.productForm.reset();
    }
  }

  onEdit(product: { id: number, name: string }): void {
    this.editMode = true;
    this.selectedProductId = product.id;
    this.productForm.patchValue({
      name: product.name
    });
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
