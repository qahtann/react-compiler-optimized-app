import { Link, useLocation } from 'react-router-dom';
import { Home, List, BarChart3, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/list', label: 'List Demo', icon: List },
  { path: '/chart', label: 'Chart Demo', icon: BarChart3 },
  { path: '/benchmark', label: 'Benchmark', icon: Gauge },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="border-b bg-muted/40">
      <div className="container">
        <div className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:bg-background',
                  isActive
                    ? 'border-b-2 border-primary bg-background text-foreground'
                    : 'text-muted-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
