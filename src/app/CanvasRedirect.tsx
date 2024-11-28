'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function CanvasRedirect() {
  const router = useRouter();

  useEffect(() => {
    const isCanvas = window.location !== window.parent.location;
    if (isCanvas) {
      console.log('isCanvas', isCanvas);
      router.replace('/salesforce');
    }
  }, [router]);

  return null;
}
