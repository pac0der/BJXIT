import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  username: string | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(name => this.username = name);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
