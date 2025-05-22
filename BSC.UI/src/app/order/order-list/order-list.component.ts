import { Component, OnInit } from '@angular/core';
import { OrderResponseDto } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  orders: OrderResponseDto[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllWithSP().subscribe({
      next: data => this.orders = data,
      error: err => console.error('Error loading orders', err)
    });
  }
}
