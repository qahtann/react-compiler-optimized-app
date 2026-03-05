import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRenderCount } from '@/hooks/useRenderCount';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
  secondary: number;
}

function generateData(count: number): DataPoint[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `Point ${i + 1}`,
    value: Math.floor(Math.random() * 100) + 50,
    secondary: Math.floor(Math.random() * 100) + 30,
  }));
}

export function ChartDemo() {
  const renderCount = useRenderCount('ChartDemo');
  const [data, setData] = useState<DataPoint[]>(() => generateData(20));
  const [isAnimating, setIsAnimating] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setData(generateData(20));
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Dynamic Chart Demo</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Renders: {renderCount}</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAnimating(!isAnimating)}
            >
              {isAnimating ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
            >
              Switch to {chartType === 'line' ? 'Bar' : 'Line'} Chart
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="secondary"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
              <Bar dataKey="secondary" fill="hsl(var(--chart-2))" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
