export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PerformanceMetrics {
  renderCount: number;
  averageRenderTime: number;
  totalRenderTime: number;
  memoHits: number;
  memoMisses: number;
}

export interface BenchmarkResult {
  compilerEnabled: boolean;
  metrics: PerformanceMetrics;
  timestamp: number;
}
