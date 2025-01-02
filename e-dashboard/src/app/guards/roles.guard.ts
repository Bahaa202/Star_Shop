import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const loggedUser: any = _authService.loggedUser.getValue()
  if (loggedUser?.role! === 'admin') return true
  else {
    _router.navigate(['/home']);
    return false;
  }
};
