import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { decodeToken } from "../utils/jwt.utils";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.apiBaseUrl + '/Auth';
    private userSubject = new BehaviorSubject<string | null>(null);
    user$: Observable<string | null> = this.userSubject.asObservable();

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
            username,
            password
        });
    }
    setToken(token: string) {
        localStorage.setItem('token', token);
        const username = decodeToken(token).unique_name;
        this.userSubject.next(username);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        this.userSubject.next(null);
        localStorage.removeItem('token');
    }
}