import { Component } from '@angular/core';
import { OrderRequestDto } from '../models/order.model';
import { Product } from '../models/product-model';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  products: Product[] = [];
  customerName = '';
  items: { productId: number; quantity: number }[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(p => {
      this.products = p;
      // initialize one entry by default
      this.items.push({ productId: p[0]?.id ?? 0, quantity: 1 });
    });
  }

  addItem() {
    this.items.push({ productId: this.products[0]?.id ?? 0, quantity: 1 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  onSubmit(form: any) {
    if (form.invalid) return;

    const order: OrderRequestDto = {
      customerName: this.customerName,
      items: this.items
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        alert('Order placed successfully!');
        form.resetForm();
        this.items = [];
      },
      error: (response: any) => alert(response.error.message)
    });
  }
}
