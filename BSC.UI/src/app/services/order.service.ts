import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderRequestDto, OrderResponseDto } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private baseUrl = environment.apiBaseUrl + '/order';

    constructor(private http: HttpClient) { }

    placeOrder(order: OrderRequestDto): Observable<OrderRequestDto> {
        return this.http.post<OrderRequestDto>(`${this.baseUrl}`, order);
    }

    getAllWithSP() {
        return this.http.get<OrderResponseDto[]>(`${this.baseUrl}/GetAllWithSP`);
    }
}