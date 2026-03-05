import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Home } from '@/pages/Home';
import { ListDemo } from '@/pages/ListDemo';
import { ChartDemoPage } from '@/pages/ChartDemo';
import { Benchmark } from '@/pages/Benchmark';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<ListDemo />} />
                <Route path="/chart" element={<ChartDemoPage />} />
                <Route path="/benchmark" element={<Benchmark />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
