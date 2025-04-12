import { CanMatchFn } from '@angular/router';

export const isAuthenticatedGuard: CanMatchFn = (route, segments) => {
  return true;
};
