import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  error = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();

    this.productService.refreshList$.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getInventoryReport().subscribe({
      next: (data) => this.products = data,
      error: (err) => this.error = 'Failed to load products'
    });
  }
}
