'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface LogoutButtonProps {
  className?: string;
  label?: string;
  pendingLabel?: string;
  onLoggedOut?: () => void;
}

export function LogoutButton({ className, label = 'Logout', pendingLabel = 'Signing out...', onLoggedOut }: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      onLoggedOut?.();
      router.replace('/auth/login');
      router.refresh();
    });
  }

  return (
    <button type="button" onClick={handleLogout} disabled={isPending} className={className}>
      {isPending ? pendingLabel : label}
    </button>
  );
}