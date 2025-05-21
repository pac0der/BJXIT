import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../models/user-role.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const expectedRole = route.data['role'] as string[];

  if (!token) {
    return router.parseUrl('/login');
  }

  const userRole = getUserRoleFromToken(token);


  if (!userRole || (expectedRole && !expectedRole.includes(userRole))) {
    if(userRole === UserRole.Staff){
      return router.parseUrl('/product');      
    }
    return router.parseUrl('/login'); // access-denied
  }

  return true;
};

export const redirectIfLoggedIn: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token') ?? '';

  const userRole = getUserRoleFromToken(token);

  switch (userRole) {
    case UserRole.Admin:
      return router.parseUrl('/user');
    case UserRole.Staff:
      return router.parseUrl('/product');
  }

  return true;
};

function getUserRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}
