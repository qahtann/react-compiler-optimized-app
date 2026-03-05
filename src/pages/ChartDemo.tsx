import { ChartDemo } from '@/components/demo/ChartDemo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ChartDemoPage() {
  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Chart Demo</h1>
        <p className="text-muted-foreground">
          Dynamic charts that update in real-time. React Compiler memoizes chart data processing
          and prevents unnecessary re-renders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Real-time chart updates with optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Charts update every second when animation is enabled</p>
          <p>• React Compiler memoizes data transformations</p>
          <p>• Switch between Line and Bar chart types</p>
          <p>• Render count shows how compiler reduces re-renders</p>
          <p>• Uses Recharts for beautiful, responsive visualizations</p>
        </CardContent>
      </Card>

      <ChartDemo />
    </div>
  );
}
