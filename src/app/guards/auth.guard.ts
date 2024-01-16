import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router)
  console.log('storageService.isLogin', storageService.isLogin)
  if (!storageService.isLogin) {
    router.navigate(['/sign-up'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return true;
};
