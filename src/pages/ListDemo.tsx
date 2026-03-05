import { OptimizedList } from '@/components/demo/OptimizedList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ListDemo() {
  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">List Demo</h1>
        <p className="text-muted-foreground">
          Demonstrates virtualized lists with TanStack Virtual and React Query integration.
          The React Compiler automatically memoizes filtering and rendering logic.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Performance optimizations in action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Uses TanStack Virtual for efficient rendering of large lists</p>
          <p>• Only renders visible items (virtual scrolling)</p>
          <p>• Search filtering is memoized by React Compiler</p>
          <p>• Supports both real API data and generated mock data (10k items)</p>
          <p>• Render count tracking shows optimization benefits</p>
        </CardContent>
      </Card>

      <OptimizedList />
    </div>
  );
}
