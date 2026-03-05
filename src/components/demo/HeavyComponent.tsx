import { useRenderCount } from '@/hooks/useRenderCount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeavyComponentProps {
  id: number;
  name: string;
  value: number;
  multiplier: number;
  onUpdate?: (id: number) => void;
}

// Simulate heavy computation
function expensiveComputation(value: number, multiplier: number): number {
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += value * multiplier * Math.random();
  }
  return Math.round(result);
}

export function HeavyComponent({ id, name, value, multiplier, onUpdate }: HeavyComponentProps) {
  const renderCount = useRenderCount(`HeavyComponent-${id}`);
  
  // This computation will be memoized by React Compiler if enabled
  const computedValue = expensiveComputation(value, multiplier);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary">Renders: {renderCount}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Value:</span>
            <span className="font-mono">{value}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Multiplier:</span>
            <span className="font-mono">{multiplier}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Computed:</span>
            <span className="font-mono font-semibold">{computedValue}</span>
          </div>
          {onUpdate && (
            <button
              onClick={() => onUpdate(id)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Update
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
