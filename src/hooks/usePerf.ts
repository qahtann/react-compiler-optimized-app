import { useRef, useCallback, useEffect } from 'react';

export interface PerfMetrics {
  renderCount: number;
  averageRenderTime: number;
  totalRenderTime: number;
  minRenderTime: number;
  maxRenderTime: number;
  fps: number;
}

export function usePerf(componentName: string) {
  const metricsRef = useRef<PerfMetrics>({
    renderCount: 0,
    averageRenderTime: 0,
    totalRenderTime: 0,
    minRenderTime: Infinity,
    maxRenderTime: 0,
    fps: 0,
  });

  const renderTimesRef = useRef<number[]>([]);
  const frameCountRef = useRef(0);
  const lastFpsUpdateRef = useRef(performance.now());

  const measureRender = useCallback(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      metricsRef.current.renderCount += 1;
      metricsRef.current.totalRenderTime += renderTime;
      metricsRef.current.averageRenderTime = 
        metricsRef.current.totalRenderTime / metricsRef.current.renderCount;
      metricsRef.current.minRenderTime = Math.min(
        metricsRef.current.minRenderTime,
        renderTime
      );
      metricsRef.current.maxRenderTime = Math.max(
        metricsRef.current.maxRenderTime,
        renderTime
      );

      renderTimesRef.current.push(renderTime);
      if (renderTimesRef.current.length > 100) {
        renderTimesRef.current.shift();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastFpsUpdateRef.current;
      
      if (elapsed >= 1000) {
        metricsRef.current.fps = Math.round((frameCountRef.current * 1000) / elapsed);
        frameCountRef.current = 0;
        lastFpsUpdateRef.current = now;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    frameCountRef.current += 1;
  });

  return {
    metrics: metricsRef.current,
    measureRender,
    reset: useCallback(() => {
      metricsRef.current = {
        renderCount: 0,
        averageRenderTime: 0,
        totalRenderTime: 0,
        minRenderTime: Infinity,
        maxRenderTime: 0,
        fps: 0,
      };
      renderTimesRef.current = [];
      frameCountRef.current = 0;
      lastFpsUpdateRef.current = performance.now();
    }, []),
  };
}
