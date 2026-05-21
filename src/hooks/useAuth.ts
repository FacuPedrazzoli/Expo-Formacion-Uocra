'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth(redirectToLogin = false): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session='));
      const authenticated = !!sessionCookie;
      
      setIsAuthenticated(authenticated);
      setIsLoading(false);

      if (!authenticated && redirectToLogin) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [redirectToLogin, router]);

  return { isAuthenticated, isLoading };
}
