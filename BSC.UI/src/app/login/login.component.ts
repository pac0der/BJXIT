import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { UserRole } from '../models/user-role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  user: User;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = { userName: '', password: "", role: undefined };
  }

  login() {
    this.authService.login(this.user.userName, this.user.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/user']);
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
