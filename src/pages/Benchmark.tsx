import { useState } from 'react';
import { BenchmarkPanel } from '@/components/demo/BenchmarkPanel';
import { HeavyComponent } from '@/components/demo/HeavyComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCompilerToggle } from '@/hooks/useCompilerToggle';
import { Badge } from '@/components/ui/badge';

export function Benchmark() {
  const { actualCompilerEnabled } = useCompilerToggle();
  const [components, setComponents] = useState([
    { id: 1, name: 'Component 1', value: 10, multiplier: 2 },
    { id: 2, name: 'Component 2', value: 20, multiplier: 3 },
    { id: 3, name: 'Component 3', value: 30, multiplier: 4 },
  ]);

  const handleUpdate = (id: number) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, value: comp.value + 1, multiplier: comp.multiplier + 1 }
          : comp
      )
    );
  };

  const handleAddComponent = () => {
    const newId = Math.max(...components.map((c) => c.id)) + 1;
    setComponents((prev) => [
      ...prev,
      {
        id: newId,
        name: `Component ${newId}`,
        value: Math.floor(Math.random() * 100),
        multiplier: Math.floor(Math.random() * 10) + 1,
      },
    ]);
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Benchmark & Performance</h1>
        <p className="text-muted-foreground">
          Compare performance metrics with React Compiler enabled vs disabled.
          See how automatic memoization reduces render counts and improves performance.
        </p>
        <div className="flex items-center gap-2">
          <Badge variant={actualCompilerEnabled ? 'default' : 'secondary'}>
            Compiler: {actualCompilerEnabled ? 'ENABLED' : 'DISABLED'}
          </Badge>
          {!actualCompilerEnabled && (
            <p className="text-sm text-muted-foreground">
              Set VITE_ENABLE_COMPILER=true to enable React Compiler
            </p>
          )}
        </div>
      </div>

      <BenchmarkPanel />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Heavy Components Demo</CardTitle>
              <CardDescription>
                Components with expensive computations that benefit from memoization
              </CardDescription>
            </div>
            <Button onClick={handleAddComponent} size="sm">
              Add Component
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {components.map((comp) => (
              <HeavyComponent
                key={comp.id}
                id={comp.id}
                name={comp.name}
                value={comp.value}
                multiplier={comp.multiplier}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
          <div className="mt-4 p-4 bg-muted rounded-md text-sm">
            <p className="font-semibold mb-2">What to observe:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Render counts for each component (shown in badges)</li>
              <li>When you update one component, others should not re-render (with compiler)</li>
              <li>Expensive computations are memoized automatically</li>
              <li>Compare render counts with compiler on vs off</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
