import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../models/user-role.enum';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User = {
    userName: '',
    password: '',
    role: undefined
  };
  userRoles = Object.values(UserRole);

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit(form: any) {
    if (form.invalid) return;

    this.userService.createUser(this.user).subscribe({
      next: () => {
        alert('The user was successfully created.');
        this.router.navigate(['/user']);
      },
      error: (response) => alert(response.error.message)
    });
  }
}
