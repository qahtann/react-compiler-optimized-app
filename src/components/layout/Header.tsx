import { Moon, Sun, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useCompilerToggle } from '@/hooks/useCompilerToggle';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { actualCompilerEnabled } = useCompilerToggle();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">React Compiler Optimized App</h1>
          <Badge variant={actualCompilerEnabled ? 'default' : 'secondary'}>
            Compiler: {actualCompilerEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="View on GitHub"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
