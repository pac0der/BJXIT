import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product-model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product: Product = {
    productKey: '',
    name: '',
    stock: 0
  };

  constructor(private productService: ProductService, private router: Router) { }

  onSubmit(form: any) {
    if (form.invalid) return;

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.productService.triggerListRefresh();
        alert('Product created successfully!');
      },
      error: (response) => alert(response.error.message)
    });
  }
}
