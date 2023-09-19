import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

export const redirectUnauthorizedToAuth = () => {
  return redirectUnauthorizedTo(['auth']);
};

export const redirectLoggedInToOverview = () => {
  return redirectLoggedInTo(['overview']);
};
