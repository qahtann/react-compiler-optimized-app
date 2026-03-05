import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCompilerToggle } from '@/hooks/useCompilerToggle';
import { COMPILER_ENABLED } from '@/lib/constants';
import { Zap, TrendingUp, Code, BarChart3 } from 'lucide-react';

export function Home() {
  const { actualCompilerEnabled } = useCompilerToggle();

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">React Compiler Optimized App</h1>
        <p className="text-xl text-muted-foreground">
          A performance-focused demo showcasing React Compiler's automatic memoization capabilities
        </p>
        <div className="flex items-center gap-2">
          <Badge variant={actualCompilerEnabled ? 'default' : 'secondary'} className="text-base px-3 py-1">
            React Compiler: {actualCompilerEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
          {!actualCompilerEnabled && (
            <p className="text-sm text-muted-foreground">
              Enable by setting VITE_ENABLE_COMPILER=true in .env
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={Zap}
          title="Automatic Memoization"
          description="React Compiler automatically memoizes components and functions, reducing unnecessary re-renders"
        />
        <FeatureCard
          icon={TrendingUp}
          title="Performance Metrics"
          description="Real-time performance tracking with render counts, FPS, and render time measurements"
        />
        <FeatureCard
          icon={Code}
          title="TypeScript Strict"
          description="Full type safety with strict TypeScript configuration and no 'any' types"
        />
        <FeatureCard
          icon={BarChart3}
          title="Benchmarking"
          description="Compare performance with compiler enabled vs disabled to see the improvements"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>Modern tools and libraries</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• React 19+ with React Compiler</li>
              <li>• Vite for fast development</li>
              <li>• TypeScript (strict mode)</li>
              <li>• Tailwind CSS v4</li>
              <li>• shadcn/ui components</li>
              <li>• TanStack Query & Virtual</li>
              <li>• Recharts for visualizations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>What this demo showcases</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Large virtualized lists (10k+ items)</li>
              <li>• Dynamic chart updates</li>
              <li>• Heavy computation memoization</li>
              <li>• Real-time performance metrics</li>
              <li>• Dark/light mode</li>
              <li>• Responsive design</li>
              <li>• Accessibility (ARIA, semantic HTML)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Install Dependencies</h3>
            <code className="block p-2 bg-muted rounded text-sm">npm install</code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Enable React Compiler (Optional)</h3>
            <code className="block p-2 bg-muted rounded text-sm">
              VITE_ENABLE_COMPILER=true npm run dev
            </code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Run Development Server</h3>
            <code className="block p-2 bg-muted rounded text-sm">npm run dev</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-8 w-8 mb-2 text-primary" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
