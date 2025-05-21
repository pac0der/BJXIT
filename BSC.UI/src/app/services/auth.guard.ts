import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../models/user-role.enum';
import { decodeToken } from '../utils/jwt.utils';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const expectedRole = route.data['role'] as string[];

  if (!token) {
    return router.parseUrl('/login');
  }

  const userRole = decodeToken(token).role;


  if (!userRole || (expectedRole && !expectedRole.includes(userRole))) {
    if (userRole === UserRole.Staff) {
      return router.parseUrl('/product');
    } else if (userRole === UserRole.Seller) {
      return router.parseUrl('/order');
    }
    return router.parseUrl('/login'); // access-denied
  }

  return true;
};

export const redirectIfLoggedIn: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  let userRole = undefined;

  if (token) {
    userRole = decodeToken(token).role;
  }

  switch (userRole) {
    case UserRole.Admin:
      return router.parseUrl('/user');
    case UserRole.Staff:
      return router.parseUrl('/product');
  }

  return true;
};
