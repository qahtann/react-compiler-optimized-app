import { useRef, useEffect } from 'react';

export function useRenderCount(componentName: string): number {
  const renderCount = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    renderCount.current += 1;
    const now = performance.now();
    
    if (startTime.current === null) {
      startTime.current = now;
    }

    // Log render in development
    if (import.meta.env.DEV) {
      const elapsed = now - (startTime.current || now);
      console.log(`[${componentName}] Render #${renderCount.current} (${elapsed.toFixed(2)}ms)`);
    }
  });

  return renderCount.current;
}
