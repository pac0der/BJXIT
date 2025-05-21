import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product-model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private baseUrl = environment.apiBaseUrl + '/Product';
    private refreshListSource = new Subject<void>();
    refreshList$ = this.refreshListSource.asObservable();

    constructor(private http: HttpClient) { }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}`, product);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}`);
    }

    getInventoryReport(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/inventoryreport`);
    }

    triggerListRefresh() {
        this.refreshListSource.next();
      }
}