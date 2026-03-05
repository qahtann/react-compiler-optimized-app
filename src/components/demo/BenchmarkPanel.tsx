import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePerf, type PerfMetrics } from '@/hooks/usePerf';
import { useCompilerToggle } from '@/hooks/useCompilerToggle';
import { formatDuration } from '@/lib/utils';
import { Play, Square, RotateCcw } from 'lucide-react';

export function BenchmarkPanel() {
  const { isEnabled, actualCompilerEnabled } = useCompilerToggle();
  const { metrics, measureRender, reset } = usePerf('BenchmarkPanel');
  const [isRunning, setIsRunning] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setForceUpdate((prev) => prev + 1);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const endMeasure = measureRender();
      return endMeasure;
    }
  }, [forceUpdate, isRunning, measureRender]);

  const handleStart = () => {
    reset();
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    reset();
    setIsRunning(false);
    setForceUpdate(0);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MetricRow label="Render Count" value={metrics.renderCount.toLocaleString()} />
          <MetricRow
            label="Average Render Time"
            value={formatDuration(metrics.averageRenderTime)}
          />
          <MetricRow
            label="Min Render Time"
            value={formatDuration(metrics.minRenderTime === Infinity ? 0 : metrics.minRenderTime)}
          />
          <MetricRow
            label="Max Render Time"
            value={formatDuration(metrics.maxRenderTime)}
          />
          <MetricRow label="FPS" value={`${metrics.fps}`} />
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Compiler Status:</span>
              <Badge variant={actualCompilerEnabled ? 'default' : 'secondary'}>
                {actualCompilerEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benchmark Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={handleStart}
              disabled={isRunning}
              className="flex-1"
            >
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isRunning}
              variant="destructive"
              className="flex-1"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          <div className="rounded-md bg-muted p-4 text-sm">
            <p className="font-medium mb-2">Instructions:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Click Start to begin benchmarking</li>
              <li>Component will re-render at ~60fps</li>
              <li>Metrics update in real-time</li>
              <li>Compare with compiler on/off</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}
