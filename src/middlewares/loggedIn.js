import { AuthService } from '@/services/auth.service';

export default function loggedIn({ next, router }) {
  if (AuthService.isLoggedIn()) {
    router.push({ name: 'Homepage' });
  }

  return next();
}
