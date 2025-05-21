import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = environment.apiBaseUrl + '/order';

  constructor(private http: HttpClient) {}

  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, order);
  }
}