import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product-model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private baseUrl = environment.apiBaseUrl + '/Product';

    constructor(private http: HttpClient) { }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}`, product);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/report`);
    }
}